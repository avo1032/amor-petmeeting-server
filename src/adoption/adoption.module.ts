import { Module } from '@nestjs/common';
import { FreeAdoptionController } from './controllers/free.adoption.controller';
import { FreeAdoptionService } from './services/free.adoption.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FreeAdoptionController],
  providers: [FreeAdoptionService],
})
export class AdoptionModule {}
