import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFreeAdoptionDto } from '../dto/req.free.adoption.dto';
import { createUUIDv4 } from 'src/common/utils/create.uuid';
import { AwsS3Service } from 'src/aws/services/aws.s3.service';
import { User } from '@prisma/client';

@Injectable()
export class FreeAdoptionService {
  constructor(
    private prisma: PrismaService,
    private readonly awsS3Service: AwsS3Service,
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
    return this.prisma.freeAdoptionPost.create({
      data: {
        userId: user.id,
        uuid: createUUIDv4(),
        ...postData,
        mainImage: mainImageUrl.Location,
        subImages: {
          create: subImageUrls.map((image) => ({ image: image.Location })),
        },
      },
    });
  }

  async getFreeAdoptionByUUID(uuid: string) {
    return this.prisma.freeAdoptionPost.findFirst({
      where: { uuid },
      include: {
        subImages: true,
        user: {
          select: {
            uuid: true,
            nickName: true,
            profileImage: true,
          },
        },
      },
    });
  }
}
