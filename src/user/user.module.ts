import { Module, forwardRef } from '@nestjs/common';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh.token.entity';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { RefreshTokenRepository } from './repositories/refresh.token.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RefreshToken]),
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, RefreshTokenRepository],
  exports: [UserRepository, RefreshTokenRepository],
})
export class UserModule {}
