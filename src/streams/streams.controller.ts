import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StreamsService } from './streams.service';
import { PostStreamDto } from './dto';
import { JwtGuard } from '../common/guard';
import { GetUser } from '../common/decorator';
import { User } from '@prisma/client';

@Controller('streams')
export class StreamsController {
  constructor(private readonly streamsService: StreamsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async createStream(@Body() Dto: PostStreamDto) {
    return this.streamsService.createStream(Dto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/get-all-streams')
  async getAllStreams(@GetUser() user: User) {
    return this.streamsService.getAllStreams(user);
  }
}
