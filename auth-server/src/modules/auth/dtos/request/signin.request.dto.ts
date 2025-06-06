import { PickType } from '@nestjs/swagger';
import { SignupRequestDto } from './signup.request.dto';

export class SigninRequestDto extends PickType(SignupRequestDto, [
  'username',
  'password',
]) {}
