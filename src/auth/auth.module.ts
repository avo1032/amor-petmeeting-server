import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AwsModule } from 'src/aws/aws.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './stragegies/access.token.strategy';
import { RefreshTokenStrategy } from './stragegies/refresh.token.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [JwtModule.register({}), AwsModule, forwardRef(() => UserModule)],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
