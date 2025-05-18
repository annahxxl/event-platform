import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 테스트용 유저 생성 API
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(dto);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  // TODO: 현재 로그인한 유저의 정보를 Request 객체에서 가져오도록 수정 (me)
  @Get(':id')
  async getMe(@Param('id') id: string): Promise<User> {
    return this.usersService.getMe(id);
  }
}
