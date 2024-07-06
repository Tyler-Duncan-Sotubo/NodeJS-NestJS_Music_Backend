import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto, UserDto, AudioDto, SubscriptionDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  // Auth Logic -----------------------------------------------------------------
  async login(dto: LoginDto) {
    const user = await this.prismaService.admin.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('User Not Found');
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new ForbiddenException('Password Not Valid');
    }
    if (user && isPasswordValid) {
      const token = await this.getTokens(user.id, user.email);
      return token;
    }
    return 'Login Failed';
  }

  async logout(id: string) {
    this.validateUserId(id);
    const user = await this.prismaService.admin.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new ForbiddenException('User Not Found');
    }
    await this.prismaService.admin.update({
      where: {
        id,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    return 'Logout Success';
  }

  // Generate access and refresh tokens
  async getTokens(id: string, email: string) {
    const jwtPayload = {
      sub: id,
      email: email,
    };
    const accessToken = await this.jwtService.signAsync(jwtPayload, {
      secret: this.config.get<string>('JWT_SECRET'),
      expiresIn: '1d',
    });

    return {
      access_token: accessToken,
    };
  }

  // Users Logic -----------------------------------------------------------------
  async users() {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        email_verified: true,
      },
    });
    return users;
  }

  async user(id: string) {
    this.validateUserId(id);
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        email_verified: true,
      },
    });

    if (!user) {
      throw new ForbiddenException('User Not Found');
    }
    return user;
  }

  async updateUser(id: string, dto: UserDto) {
    this.validateUserId(id);
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new ForbiddenException('User Not Found');
    }
    const updatedUser = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
    return updatedUser;
  }

  // Audios Logic -----------------------------------------------------------------
  async audios() {
    const audios = await this.prismaService.audios.findMany({
      select: {
        id: true,
        title: true,
        artist: true,
        releaseCover: true,
        status: true,
        UPC: true,
        ISRC: true,
        smartLink: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return audios;
  }

  async audio(id: string) {
    this.validateUserId(id);
    const audio = await this.prismaService.audios.findUnique({
      where: {
        id,
      },
    });
    if (!audio) {
      throw new ForbiddenException('Audio Not Found');
    }
    return audio;
  }

  async updateAudio(id: string, dto: AudioDto) {
    this.validateUserId(id);
    const audio = await this.prismaService.audios.findUnique({
      where: {
        id,
      },
    });
    if (!audio) {
      throw new ForbiddenException('Audio Not Found');
    }
    const updatedAudio = await this.prismaService.audios.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
    return updatedAudio;
  }

  // Subscriptions Logic -----------------------------------------------------------------
  async subscriptions() {
    const subscriptions = await this.prismaService.user.findMany({
      where: {
        Subscription: {
          some: {},
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        Subscription: {
          select: {
            id: true,
            plan: true,
            status: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return subscriptions
      .map((user) => {
        return user.Subscription.map((subscription) => ({
          id: subscription.id,
          name: user.name,
          email: user.email,
          plan: subscription.plan,
          status: subscription.status,
        }));
      })
      .flat();
  }

  async subscription(id: string) {
    this.validateUserId(id);
    const subscription = await this.prismaService.subscriptions.findUnique({
      where: {
        id,
      },
    });
    if (!subscription) {
      throw new ForbiddenException('Subscription Not Found');
    }
    return subscription;
  }

  async updateSubscription(id: string, dto: SubscriptionDto) {
    this.validateUserId(id);
    const subscription = await this.prismaService.subscriptions.findUnique({
      where: {
        id,
      },
    });
    if (!subscription) {
      throw new ForbiddenException('Subscription Not Found');
    }
    const updatedSubscription = await this.prismaService.subscriptions.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
    return updatedSubscription;
  }

  validateUserId(id: string) {
    const hexRegex = /^[a-fA-F0-9]{24}$/;
    const result = hexRegex.test(id);
    if (!result) {
      throw new ForbiddenException('Invalid Id');
    }
  }
}
