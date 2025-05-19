import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninRequestDto } from './dtos/request/signin.request.dto';
import { SignupRequestDto } from './dtos/request/signup.request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignupRequestDto) {
    return this.authService.signup(body);
  }

  @Post('signin')
  async signin(@Body() body: SigninRequestDto) {
    return this.authService.signin(body);
  }
}
