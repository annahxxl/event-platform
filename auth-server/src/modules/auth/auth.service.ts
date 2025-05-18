import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { UserResponseDto } from '../users/dtos/user-response.dto';
import { User } from '../users/schemas/user.schema';
import { SignupDto } from './dtos/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async signup(dto: SignupDto) {
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
}
