import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class AwsService {
  // Add service methods here
  private s3Client = new S3Client({
    region: this.configService.get('AWS_REGION'),
  });

  constructor(private configService: ConfigService) {}

  async uploadImageToS3(user: User, fileName: string, image: any) {
    const base64Data = Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: `${user.email}/${fileName}`,
        Body: base64Data,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg',
        ACL: 'public-read',
      }),
    );

    return `https://${this.configService.get('AWS_BUCKET_NAME')}.s3.amazonaws.com/${user.email}/${fileName}`;
  }

  async uploadAudioToS3(user: User, fileName: string, audio: any) {
    const base64Data = Buffer.from(
      audio.replace(/^data:audio\/\w+;base64,/, ''),
      'base64',
    );
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: `${user.email}/${fileName}`,
        Body: base64Data,
        ContentEncoding: 'base64',
        ContentType: 'audio/mpeg',
      }),
    );

    return `https://${this.configService.get('AWS_BUCKET_NAME')}.s3.amazonaws.com/${user.email}/${fileName}`;
  }

  async getPreSignedURLToViewObject(key: string) {
    const params = {
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: key,
      Expires: 300,
    };

    const tmp = await getSignedUrl(
      this.s3Client,
      new GetObjectCommand(params),
      {
        expiresIn: 300,
      },
    );

    // get data from s3
    const data_downloded = await fetch(tmp);

    // serialize image data to base64
    const serialized_data = await data_downloded.arrayBuffer();
    const base64 = Buffer.from(serialized_data).toString('base64');

    return base64;
  }
}
