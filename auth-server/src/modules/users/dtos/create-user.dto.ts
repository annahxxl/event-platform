import { UserRole } from '../schemas/user.schema';

export class CreateUserDto {
  username: string;
  password: string;
  role?: UserRole;
}
