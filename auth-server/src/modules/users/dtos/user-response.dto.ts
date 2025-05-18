import { PickType } from '@nestjs/swagger';
import { User } from '../schemas/user.schema';

export class UserResponseDto extends PickType(User, [
  'id',
  'username',
  'role',
  'isActive',
]) {
  static from(user: User): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = user.id;
    dto.username = user.username;
    dto.role = user.role;
    dto.isActive = user.isActive;
    return dto;
  }
}
