import { InjectRepository } from '@nestjs/typeorm';
import { SubImage } from '../entities/subimage.entity';
import { Repository } from 'typeorm';
import { FreeAdoptionPost } from '../entities/free.adoptioin.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SubImageRepository {
  constructor(
    @InjectRepository(SubImage)
    private readonly subImageRepository: Repository<SubImage>,
  ) {}

  async delete(post: FreeAdoptionPost): Promise<void> {
    await this.subImageRepository.delete(post);
  }
}
