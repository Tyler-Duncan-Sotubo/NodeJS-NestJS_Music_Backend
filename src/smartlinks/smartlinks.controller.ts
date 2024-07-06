import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { PreSaveDto } from './dto';
import { SmartLinksService } from './smartlinks.service';

@Controller('smartlinks')
export class SmartlinksController {
  constructor(private smartLinks: SmartLinksService) {}

  @Post('/')
  async createSmartLink(@Body() dto: PreSaveDto) {
    return await this.smartLinks.createSmartLink(dto);
  }

  @Get('/:url')
  async getSmartLinks(@Param('url') url: string) {
    return await this.smartLinks.getSmartLinks(url);
  }
}
