import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdoptionModule } from './adoption/adoption.module';
import { ConfigModule } from '@nestjs/config';
import { AwsModule } from './aws/aws.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { Config, validate } from './config/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validate,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: Config.DB_USERNAME,
      password: Config.DB_PASSWORD,
      host: Config.DB_HOST,
      port: Config.DB_PORT,
      database: Config.DB_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      timezone: 'Asia/Seoul',
    }),
    AdoptionModule,
    AwsModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
