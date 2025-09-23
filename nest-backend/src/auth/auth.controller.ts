import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, VerifyDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.service.sendOtp(body.phone);
  }

  @Post('verify')
  verify(@Body() body: VerifyDto) {
    return this.service.verifyOtp(body.phone, body.otp);
  }
}
