import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // diğer modüller de PrismaService'i kullanabilsin diye
})
export class DatabaseModule {}