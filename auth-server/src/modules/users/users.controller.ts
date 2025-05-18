import { Controller, Get } from '@nestjs/common';
import { UserResponseDto } from './dtos/user-response.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<UserResponseDto[]> {
    return this.usersService.getUsers();
  }
}
