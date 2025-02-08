import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, AuthSignupDto } from './dto/auth.dto';
import { AuthVerifyDto } from './dto/authVerify.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthSignupDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @Post('verify')
  @HttpCode(200)
  verify(@Body() dto: AuthVerifyDto) {
    return this.authService.verify(dto);
  }
}
