import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AudioReleaseDto, VideoReleaseDto } from './dto';
import { AwsService } from '../aws/aws.service';
import { PrismaService } from '../prisma/prisma.service';
import { MusicReleaseService } from '../mail/musicRelease.service';
import { NotificationService } from '../mail/notification.service';

@Injectable()
export class MusicService {
  constructor(
    private awsService: AwsService,
    private prismaService: PrismaService,
    private musicReleaseService: MusicReleaseService,
    private notificationService: NotificationService,
  ) {}
  async createAudioRelease(dto: AudioReleaseDto) {
    const user = dto.user as User;
    // strip off space in string
    const imageFileName = dto.imageFileName.split(' ').join('');
    const audioFileName = dto.audioFileName.split(' ').join('');

    const image = await this.awsService.uploadImageToS3(
      user,
      imageFileName,
      dto.releaseCover,
    );

    let audio: string | null = null;

    if (dto.releaseAudio) {
      audio = await this.awsService.uploadAudioToS3(
        user,
        audioFileName,
        dto.releaseAudio,
      );
    }

    delete dto.imageFileName;
    delete dto.audioFileName;
    delete dto.user;

    const audioRelease = await this.prismaService.audios.create({
      data: {
        ...dto,
        userId: user.id,
        releaseDate: new Date(dto.releaseDate),
        releaseCover: image,
        releaseAudio: audio,
        status: 'pending',
        releaseType: 'audio',
      },
    });

    if (audioRelease) {
      // send email
      this.musicReleaseService.sendMusicReleaseEmail(user.email, user.name);
      // send notification
      this.notificationService.sendMusicReleaseEmail();
    }
    return 'Audio Release Created';
  }

  async createVideoRelease(user: User, dto: VideoReleaseDto) {
    await this.prismaService.videos.create({
      data: {
        ...dto,
        userId: user.id,
        status: 'pending',
        releaseDate: new Date(dto.releaseDate),
        releaseType: 'video',
      },
    });

    return 'Video Release Created';
  }

  async getReleases(user: User) {
    const audioReleases = await this.prismaService.audios.findMany({
      where: {
        userId: user.id,
      },
    });

    const videoReleases = await this.prismaService.videos.findMany({
      where: {
        userId: user.id,
      },
    });

    if (audioReleases.length > 0 && videoReleases.length === 0) {
      return audioReleases;
    }

    if (videoReleases.length > 0 && audioReleases.length === 0) {
      return videoReleases;
    }

    if (audioReleases.length === 0 && videoReleases.length === 0) {
      return {
        message: 'No Release Found',
      };
    }

    const releases = [...audioReleases, ...videoReleases];
    return releases;
  }

  async getLatestReleases() {
    const allAudioReleases = await this.prismaService.audios.findMany({
      where: {
        status: 'Live',
      },
      orderBy: {
        releaseDate: 'desc',
      },
      select: {
        title: true,
        releaseCover: true,
        artist: true,
        smartLink: true,
      },
    });
    return allAudioReleases;
  }
}
