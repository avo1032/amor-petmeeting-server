import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FreeAdoptionPost } from '../entities/free.adoptioin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FreeAdoptionRepository {
  constructor(
    @InjectRepository(FreeAdoptionPost)
    private readonly freeAdoptionPostRepository: Repository<FreeAdoptionPost>,
  ) {}

  async save(post: FreeAdoptionPost): Promise<FreeAdoptionPost> {
    return this.freeAdoptionPostRepository.save(post);
  }

  async findOneByUUID(uuid: string): Promise<FreeAdoptionPost> {
    return this.freeAdoptionPostRepository.findOne({
      where: { uuid },
      relations: ['subImages'],
    });
  }

  async getAllPosts(): Promise<FreeAdoptionPost[]> {
    return this.freeAdoptionPostRepository.find({
      where: { visible: true },
    });
  }

  async softRemove(post: FreeAdoptionPost): Promise<void> {
    await this.freeAdoptionPostRepository.softRemove(post);
  }
}
