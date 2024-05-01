import { Body, Controller, Get, Post } from '@nestjs/common';
import { FreeAdoptionService } from '../services/free.adoption.service';
import { CreateFreeAdoptionDto } from '../dto/req.free.adoption.dto';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('free-adoption')
export class FreeAdoptionController {
  constructor(private readonly freeAdoptionService: FreeAdoptionService) {}

  @Post()
  @FormDataRequest()
  async createFreeAdoption(@Body() body: CreateFreeAdoptionDto) {
    return this.freeAdoptionService.createFreeAdoption(body);
  }
}
