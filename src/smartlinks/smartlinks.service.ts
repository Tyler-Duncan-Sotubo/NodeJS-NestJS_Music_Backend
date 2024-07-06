import { ForbiddenException, Injectable } from '@nestjs/common';
import { PreSaveDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SmartLinksService {
  constructor(private prismaService: PrismaService) {}
  async createSmartLink(dto: PreSaveDto) {
    const url = dto.title
      .replace(/ /g, '-')
      .replace(/\(/g, '')
      .replace(/\)/g, '')
      .replace(/\./g, '')
      .replace(/'/g, '');

    const checkUrl = await this.prismaService.preSaveLinks.findMany({
      where: {
        url: url.toLowerCase(),
      },
    });

    if (checkUrl.length > 0) {
      throw new ForbiddenException('Smart Link Already Exists');
    }

    return await this.prismaService.preSaveLinks.create({
      data: {
        ...dto,
        url: url.toLowerCase(),
      },
    });
  }

  async getSmartLinks(url: string) {
    const preSavedLink = await this.prismaService.preSaveLinks.findUnique({
      where: {
        url,
      },
    });

    if (!preSavedLink) {
      throw new ForbiddenException('Smart Link Not Found');
    }

    return preSavedLink;
  }
}
