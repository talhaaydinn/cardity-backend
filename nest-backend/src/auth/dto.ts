import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  phone: string;
}

export class VerifyDto {
  @IsString()
  phone: string;

  @IsString()
  @Length(4, 6)
  otp: string;
}
