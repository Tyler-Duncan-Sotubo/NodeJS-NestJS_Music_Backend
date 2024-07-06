import { Injectable, ForbiddenException } from '@nestjs/common';
import { AuthDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Label } from '@prisma/client';

@Injectable()
export class LabelService {
  constructor(private prisma: PrismaService) {}

  async login(LoginDto: AuthDto) {
    const { email, password } = LoginDto;
    const user = await this.prisma.label.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ForbiddenException('Password Invalid');
    }
    return user;
  }

  // Get Label Artists By Id Logic
  async getArtistsById(label: Label) {
    const artists = await this.prisma.user.findMany({
      where: {
        LabelArtists: {
          some: {
            labelId: label.id,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return artists;
  }

  // Get All Artists Under Label Subscriptions
  async getArtistsSubscriptions(label: Label) {
    const artists = await this.prisma.subscriptions.findMany({
      where: {
        LabelSubscriptions: {
          some: {
            labelId: label.id,
          },
        },
      },
      select: {
        id: true,
        plan: true,
        User: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return artists.map((item) => {
      const { User, ...rest } = item;
      return {
        ...rest,
        name: User.name,
        email: User.email,
      };
    });
  }

  // Label Subscriptions
  // async artistsSubscriptions(subscriptionDto: SubscriptionDto) {
  //   const { labelId, artistId, artistSubscriptionId } = subscriptionDto;
  //   const artist = await this.prisma.labelSubscriptions.create({
  //     data: {
  //       labelId,
  //       artistId,
  //       artistSubscriptionId,
  //     },
  //   });
  //   return artist;
  // }

  // Label Artists
  //   async artists(artistDto: ArtistDto) {
  //     const { labelId, artistId } = artistDto;
  //     const artist = await this.prisma.labelArtists.create({
  //       data: {
  //         labelId,
  //         artistId,
  //       },
  //     });
  //     return artist;
  //   }

  // Label Register
  //   async register(registerDto: AuthDto) {
  //     const { email, password, name } = registerDto;
  //     const hashPassword = await bcrypt.hash(password, 10);
  //     const user = await this.prisma.label.create({
  //       data: {
  //         email,
  //         password: hashPassword,
  //         name,
  //       },
  //     });
  //       return user;
  //   }
}
