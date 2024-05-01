import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FreeAdoptionService {
  constructor(private prisma: PrismaService) {}

  test() {
    const config = process.env.ENV_INFO
    console.log(config)
    return this.prisma.freeAdoptionPost.findMany();
  }
}
