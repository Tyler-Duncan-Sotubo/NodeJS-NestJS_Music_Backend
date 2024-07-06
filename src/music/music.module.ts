import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { AwsService } from 'src/aws/aws.service';

@Module({
  controllers: [MusicController],
  providers: [MusicService, AwsService],
})
export class MusicModule {}
