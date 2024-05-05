import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { FreeAdoptionService } from '../services/free.adoption.service';
import { CreateFreeAdoptionDto } from '../dto/req.free.adoption.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { AccessTokenGuard } from 'src/common/guards/access.token.guard';

@Controller('free-adoption')
export class FreeAdoptionController {
  constructor(private readonly freeAdoptionService: FreeAdoptionService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @FormDataRequest()
  async createFreeAdoption(@Body() body: CreateFreeAdoptionDto) {
    // return this.freeAdoptionService.createFreeAdoption(body);
  }
}
