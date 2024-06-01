import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  IsArray,
  ValidateNested,
} from 'class-validator';

import {
  IsFile,
  MaxFileSize,
  HasMimeType,
  MemoryStoredFile,
} from 'nestjs-form-data';
import { Transform } from 'class-transformer';
import { AnimalType, Sex } from '../entities/free.adoptioin.entity';

export class CreateFreeAdoptionDto {
  @IsNotEmpty()
  @IsString()
  region: string;

  @IsNotEmpty()
  @IsString()
  detailedRegion: string;

  @IsEnum(AnimalType)
  animalType: AnimalType;

  @IsNotEmpty()
  @IsString()
  breed: string;

  @IsEnum(Sex)
  sex: Sex;

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  ageInMonths: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;

  @IsFile()
  @MaxFileSize(500 * 1024)
  @HasMimeType(['image/jpeg', 'image/png'])
  mainImage: MemoryStoredFile;

  @IsArray()
  @ValidateNested({ each: true })
  subImages: MemoryStoredFile[];
}
