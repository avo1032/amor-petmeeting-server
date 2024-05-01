import { Controller, Get } from '@nestjs/common';
import { FreeAdoptionService } from '../services/free.adoption.service';

@Controller('adoption/free')
export class FreeAdoptionController {
  constructor(private readonly freeAdoptionService: FreeAdoptionService) {}

  @Get()
  async test() {
    return this.freeAdoptionService.test();
  }
}
