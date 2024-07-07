import { Injectable, ForbiddenException } from '@nestjs/common';
import { PostStreamDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class StreamsService {
  constructor(private prismService: PrismaService) {}

  createStream(dto: PostStreamDto) {
    const user = this.prismService.user.findUnique({
      where: {
        id: dto.userId,
      },
    });

    const audio = this.prismService.audios.findUnique({
      where: {
        id: dto.audioId,
      },
    });

    if (!user || !audio) {
      throw new ForbiddenException('User or Audio Not Found');
    }

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
