import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../common/guard';
import { MusicService } from './music.service';
import { GetUser } from '../common/decorator';
import { User } from '@prisma/client';
import { AudioReleaseDto, VideoReleaseDto } from './dto';

@Controller('api/music')
export class MusicController {
  constructor(private musicService: MusicService) {}

  // Add endpoints here
  @HttpCode(HttpStatus.CREATED)
  @Post('/create/audio')
  async createAudioRelease(@Body() dto: AudioReleaseDto) {
    return this.musicService.createAudioRelease(dto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/create/video')
  async createVideoRelease(
    @GetUser() user: User,
    @Body() dto: VideoReleaseDto,
  ) {
    return this.musicService.createVideoRelease(user, dto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/releases')
  async getMusicReleases(@GetUser() user: User) {
    return this.musicService.getReleases(user);
  }

  @HttpCode(HttpStatus.CREATED)
  @Get('/latest-releases')
  async getLatestReleases() {
    return this.musicService.getLatestReleases();
  }
}
