import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AwsModule } from 'src/aws/aws.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './stragegies/access.token.strategy';
import { RefreshTokenStrategy } from './stragegies/refresh.token.strategy';

@Module({
  imports: [JwtModule.register({}), PrismaModule, AwsModule],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
