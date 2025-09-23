import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';


@Injectable()
export class AuthService {
  private otpStore = new Map<string, string>();

  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async sendOtp(phone: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString().slice(0, 6);
    this.otpStore.set(phone, otp);

    // TODO: Gerçek SMS servisine bağlanılacak
    return { sent: true, dev_otp: otp };
  }

  async verifyOtp(phone: string, otp: string) {
    const real = this.otpStore.get(phone);
    if (!real || real !== otp) throw new UnauthorizedException('Invalid OTP');

    let user = await this.prisma.user.findUnique({ where: { phone } });
    if (!user) {
      user = await this.prisma.user.create({ data: { phone, role: 'USER' } });
    }

    const payload = { sub: user.id, phone: user.phone, role: user.role };
    const token = await this.jwt.signAsync(payload);
    return { token, role: user.role };
  }
}
