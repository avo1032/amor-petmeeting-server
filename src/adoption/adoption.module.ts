import { Module } from '@nestjs/common';
import { FreeAdoptionController } from './controllers/free.adoption.controller';
import { FreeAdoptionService } from './services/free.adoption.service';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { AwsModule } from 'src/aws/aws.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FreeAdoptionPost } from './entities/free.adoptioin.entity';
import { SubImage } from './entities/subimage.entity';
import { FreeAdoptionRepository } from './repositories/free.adoption.repository';
import { SubImageRepository } from './repositories/subImages.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([FreeAdoptionPost, SubImage]),
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
    AwsModule,
  ],
  controllers: [FreeAdoptionController],
  providers: [FreeAdoptionService, FreeAdoptionRepository, SubImageRepository],
})
export class AdoptionModule {}
