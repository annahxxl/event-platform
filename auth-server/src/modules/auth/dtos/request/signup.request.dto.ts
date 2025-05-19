import { UserRole } from '../../../users/schemas/user.schema';

export class SignupRequestDto {
  username: string;
  password: string;
  role?: UserRole;
}
