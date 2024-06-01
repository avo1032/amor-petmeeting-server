import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFreeAdoptionDto } from '../dto/req.free.adoption.dto';
import { createUUIDv4 } from 'src/common/utils/create.uuid';
import { AwsS3Service } from 'src/aws/services/aws.s3.service';
import { FreeAdoptionRepository } from '../repositories/free.adoption.repository';
import { FreeAdoptionPost } from '../entities/free.adoptioin.entity';
import { SubImageRepository } from '../repositories/subImages.repository';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class FreeAdoptionService {
  constructor(
    private readonly awsS3Service: AwsS3Service,
    private readonly freeAdoptionRepository: FreeAdoptionRepository,
    private readonly subImageRepository: SubImageRepository,
  ) {}

  async createFreeAdoption(body: CreateFreeAdoptionDto, user: User) {
    const { subImages, mainImage, ...postData } = body;
    const mainImageKey = `freeAdoption/${createUUIDv4()}`;
    const subImageKeys = subImages.map(() => `freeAdoption/${createUUIDv4()}`);
    const mainImageUrl = await this.awsS3Service.uploadFile(
      mainImage,
      mainImageKey,
    );
    const subImageUrls = await Promise.all(
      subImages.map((image, index) =>
        this.awsS3Service.uploadFile(image, subImageKeys[index]),
      ),
    );
    const post = Object.assign(new FreeAdoptionPost(), {
      user,
      ...postData,
      uuid: createUUIDv4(),
      mainImage: mainImageUrl.Location,
      subImages: {
        create: subImageUrls.map((image) => ({ image: image.Location })),
      },
    });
    await this.freeAdoptionRepository.save(post);
    return post;
  }

  async getFreeAdoptionByUUID(uuid: string) {
    return this.freeAdoptionRepository.findOneByUUID(uuid);
  }

  async getAllFreeAdoptions() {
    return this.freeAdoptionRepository.getAllPosts();
  }

  async deleteFreeAdoptionByUUID(uuid: string, user: User) {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Access Denied');
    }
    const freeAdoption = await this.freeAdoptionRepository.findOneByUUID(uuid);
    if (!freeAdoption) {
      throw new NotFoundException('Free Adoption Post Not Found');
    }
    await this.subImageRepository.delete(freeAdoption);
    return await this.freeAdoptionRepository.softRemove(freeAdoption);
  }
}
