import { Injectable } from '@nestjs/common';
import { PostStreamDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class StreamsService {
  constructor(private prismService: PrismaService) {}

  createStream(dto: PostStreamDto) {
    return this.prismService.streams.create({
      data: {
        ...dto,
      },
    });
  }

  getAllStreams(user: User) {
    const streams = this.prismService.streams.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        id: 'desc',
      },
    });
    return streams;
  }
}
