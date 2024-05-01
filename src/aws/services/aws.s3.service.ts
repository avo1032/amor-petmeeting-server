import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { MemoryStoredFile } from 'nestjs-form-data';

@Injectable()
export class AwsS3Service {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async uploadFile(
    file: MemoryStoredFile,
    key: string,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimeType,
    };

    return this.s3.upload(uploadParams).promise();
  }
}
