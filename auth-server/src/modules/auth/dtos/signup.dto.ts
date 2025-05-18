import { UserRole } from '../../users/schemas/user.schema';

export class SignupDto {
  username: string;
  password: string;
  role?: UserRole;
}
