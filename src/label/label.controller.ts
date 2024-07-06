import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { LabelService } from './label.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto';
import { LabelJwtGuard } from '../common/guard';
import { GetLabel } from '../common/decorator';
import { Label } from '@prisma/client';

@Controller('api/label')
export class LabelController {
  constructor(
    private labelService: LabelService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  // Label Logic
  @Post('login')
  async login(@Body() loginDto: AuthDto) {
    const user = await this.labelService.login(loginDto);
    const token = await this.getTokens(user.id, user.email, user.name);
    return token;
  }

  // Get Label Details
  @UseGuards(LabelJwtGuard)
  @Get('/')
  async getLabel(@GetLabel() label: Label) {
    return label;
  }

  // Get Label Artists By Id Logic
  @UseGuards(LabelJwtGuard)
  @Get('artists')
  async getArtistsById(@GetLabel() label: Label) {
    return await this.labelService.getArtistsById(label);
  }

  // Get All Artists Under Label Subscriptions
  @UseGuards(LabelJwtGuard)
  @Get('subscriptions')
  async getArtists(@GetLabel() label: Label) {
    return await this.labelService.getArtistsSubscriptions(label);
  }

  // Generate access and refresh tokens
  async getTokens(id: string, email: string, name: string) {
    const jwtPayload = {
      sub: id,
      email: email,
      name: name,
    };
    const accessToken = await this.jwtService.signAsync(jwtPayload, {
      secret: this.config.get<string>('JWT_SECRET'),
      expiresIn: '1d',
    });

    return {
      access_token: accessToken,
    };
  }

  // Label Subscriptions
  // @Post('subscriptions')
  // async artistsSubscriptions(@Body() subscriptionDto: SubscriptionDto) {
  //   return await this.labelService.artistsSubscriptions(subscriptionDto);
  // }

  // Label Artists
  //   @Post('artist')
  //   async artists(@Body() artistDto: ArtistDto) {
  //     return await this.labelService.artists(artistDto);
  //   }

  // Label Register
  //   @Post('register')
  //   async register(@Body() registerDto: AuthDto) {
  //     return await this.labelService.register(registerDto);
  //   }
}
