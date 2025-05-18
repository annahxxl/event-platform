import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { UserResponseDto } from '../users/dtos/user-response.dto';
import { User } from '../users/schemas/user.schema';
import { SigninResponseDto } from './dtos/signin-response.dto';
import { SigninDto } from './dtos/signin.dto';
import { SignupDto } from './dtos/signup.dto';

interface JwtPayload {
  sub: string;
  username: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto): Promise<UserResponseDto> {
    // 중복 사용자 확인
    const existingUser = await this.userModel.findOne({
      username: dto.username,
    });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // 비밀번호 해싱
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    // 해시된 비밀번호로 사용자 생성
    const user = await this.userModel.create({
      ...dto,
      password: hashedPassword,
    });

    return UserResponseDto.from(user);
  }

  async signin(dto: SigninDto): Promise<SigninResponseDto> {
    // 1. 사용자명으로 사용자 찾기
    const user = await this.userModel.findOne({ username: dto.username });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. JWT 토큰 생성
    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    // 4. 토큰 반환
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
