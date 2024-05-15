import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FreeAdoptionService } from '../services/free.adoption.service';
import { CreateFreeAdoptionDto } from '../dto/req.free.adoption.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { AccessTokenGuard } from 'src/common/guards/access.token.guard';
import { UserInfo } from 'src/common/decorators/user.info';
import { User } from '@prisma/client';
import { Delete } from '@nestjs/common';

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
    return this.freeAdoptionService.createFreeAdoption(body, user);
  }

  @Get(':uuid')
  async getFreeAdoptionByUUID(@Param('uuid') uuid: string) {
    return this.freeAdoptionService.getFreeAdoptionByUUID(uuid);
  }

  @Get()
  async getAllFreeAdoptions() {
    return this.freeAdoptionService.getAllFreeAdoptions();
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':uuid')
  async deleteFreeAdoption(@Param('uuid') uuid: string, @UserInfo() user: User) {
    return this.freeAdoptionService.deleteFreeAdoptionByUUID(uuid, user);
  }
}
