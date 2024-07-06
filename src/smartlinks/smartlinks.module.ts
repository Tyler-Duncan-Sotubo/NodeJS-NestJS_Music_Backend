import { Module } from '@nestjs/common';
import { SmartLinksService } from './smartlinks.service';
import { SmartlinksController } from './smartlinks.controller';

@Module({
  controllers: [SmartlinksController],
  providers: [SmartLinksService],
})
export class SmartlinksModule {}
