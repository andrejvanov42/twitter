import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-in')
  @UseGuards(JwtAuthGuard)
  signIn(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @Post('/sign-up')
  signUp(@Body() dto: AuthDto) {
    const user = this.authService.registration(dto);
  }

  @Post('/sign-up/verification')
  verification(@Body() code: string) {
    return this.authService.verificationCode(code);
  }
}
