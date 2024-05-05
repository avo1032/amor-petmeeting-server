import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { FreeAdoptionService } from '../services/free.adoption.service';
import { CreateFreeAdoptionDto } from '../dto/req.free.adoption.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { AccessTokenGuard } from 'src/common/guards/access.token.guard';
import { UserInfo } from 'src/common/decorators/user.info';
import { User } from '@prisma/client';

@Controller('free-adoption')
export class FreeAdoptionController {
  constructor(private readonly freeAdoptionService: FreeAdoptionService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @FormDataRequest()
  async createFreeAdoption(
    @Body() body: CreateFreeAdoptionDto,
    @UserInfo() user: User,
  ) {
    console.log(user);
    return this.freeAdoptionService.createFreeAdoption(body, user);
  }
}
