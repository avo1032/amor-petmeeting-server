import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsString, IsUrl } from 'class-validator';

export class Environment {
  @IsIn(['production', 'development', 'local'])
  NODE_ENV = process.env.NODE_ENV as 'production' | 'development' | 'local';

  @Type(() => Number)
  @IsNumber()
  SERVER_PORT = Number(process.env.SERVER_PORT);

  @IsString()
  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET as string;
  @IsString()
  AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID as string;
  @IsString()
  AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY as string;
  @IsString()
  DEFAULT_PROFILE_IMAGE_URL = process.env.DEFAULT_PROFILE_IMAGE_URL as string;

  @IsString()
  ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
  @IsString()
  REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

  @IsString()
  DB_HOST = process.env.DB_HOST as string;
  @Type(() => Number)
  @IsNumber()
  DB_PORT = Number(process.env.DB_PORT);
  @IsString()
  DB_USERNAME = process.env.DB_USERNAME as string;
  @IsString()
  DB_PASSWORD = process.env.DB_PASSWORD as string;
  @IsString()
  DB_DATABASE = process.env.DB_DATABASE as string;
}
