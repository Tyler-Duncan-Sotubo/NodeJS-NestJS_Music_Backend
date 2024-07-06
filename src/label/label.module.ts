import { Module } from '@nestjs/common';
import { LabelController } from './label.controller';
import { LabelService } from './label.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { LabelStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [LabelController],
  providers: [LabelService, JwtService, LabelStrategy],
})
export class LabelModule {}
