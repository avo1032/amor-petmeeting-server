import { Module } from '@nestjs/common';
import { FreeAdoptionController } from './controllers/free.adoption.controller';
import { FreeAdoptionService } from './services/free.adoption.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [
    PrismaModule,
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
    AwsModule,
  ],
  controllers: [FreeAdoptionController],
  providers: [FreeAdoptionService],
})
export class AdoptionModule {}
