import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  AuthDto,
  GetByEmailDto,
  GetByIdDto,
  PasswordResetDto,
  RegisterDto,
} from './dto';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, Tokens } from './types';
import * as crypto from 'crypto';
import { PasswordResetService } from '../mail/passwordReset.service';
import { VerifyEmailService } from '../mail/verifyEmail.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    private passwordResetService: PasswordResetService,
    private verifyEmailService: VerifyEmailService,
  ) {}

  async register(dto: RegisterDto) {
    try {
      const hash = await bcrypt.hash(dto.password, 10);
      const user = await this.prismaService.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          hash,
        },
      });
      const token = await this.getTokens(
        user.id,
        user.email,
        user.name,
        false,
        user.role,
      );
      await this.updateRtHash(user.id, token.refresh_token);
      const verifyToken = await this.generateEmailVerificationToken(user.id);
      await this.verifyEmailService.sendVerifyEmail(
        user.email,
        verifyToken,
        user.name,
      );
      return token;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
    }
  }

  async resendVerificationEmail(dto: GetByEmailDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('User With Email Not Found');
    }

    if (user.email_verified) {
      throw new ForbiddenException('Email Already Verified');
    }

    const verifyToken = await this.generateEmailVerificationToken(user.id);
    await this.verifyEmailService.sendVerifyEmail(
      user.email,
      verifyToken,
      user.name,
    );
  }

  // Generate Email Verification Token
  async generateEmailVerificationToken(id: string): Promise<string> {
    const token = crypto.randomBytes(20).toString('hex');
    const expiresAfter = new Date();
    expiresAfter.setMinutes(expiresAfter.getMinutes() + 30);
    await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        emailVerificationToken: token,
        emailVerificationTokenExpiration: expiresAfter,
      },
    });
    return token;
  }

  // Login the user
  async login(dto: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Email not found');
    }
    const match = await bcrypt.compare(dto.password, user.hash);

    if (!match) {
      throw new ForbiddenException('Password incorrect');
    }
    const shouldRemember = Boolean(dto.shouldRemember); // Fix: Convert the argument to boolean
    const token = await this.getTokens(
      user.id,
      user.email,
      user.name,
      shouldRemember,
      user.role,
    );
    await this.updateRtHash(user.id, token.refresh_token);
    return token;
  }

  // Logout the user
  async logout(dto: GetByIdDto): Promise<void> {
    await this.prismaService.user.updateMany({
      where: {
        id: dto.id,
        hashedRefreshToken: {
          not: null,
        },
      },
      data: {
        hashedRefreshToken: null,
      },
    });
  }

  // Refresh the access token
  async refresh(email: string, refreshToken: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const match = await bcrypt.compare(refreshToken, user.hashedRefreshToken);

    if (!match) {
      throw new ForbiddenException('Refresh token incorrect');
    }

    const token = await this.getTokens(user.id, user.email, user.name);
    await this.updateRtHash(user.id, token.refresh_token);
    return token;
  }

  // Update the refresh token hash in the database
  async updateRtHash(id: string, refreshToken: string): Promise<void> {
    const hash = await bcrypt.hash(refreshToken, 10);
    await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        hashedRefreshToken: hash,
      },
    });
  }

  // Send password reset email
  async passwordResetHandler(dto: GetByEmailDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('User With Email Not Found');
    }
    const token = crypto.randomBytes(20).toString('hex');
    await this.createPasswordResetToken(user.id, token);
    await this.passwordResetService.sendPasswordResetEmail(dto.email, token);
  }

  // Reset the user's password
  async resetPassword(dto: PasswordResetDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('User With Email not found');
    }

    const token = await this.prismaService.token.findFirst({
      where: {
        userId: user.id,
        resetToken: {
          not: null,
        },
        resetTokenExpiration: {
          gte: new Date(),
        },
      },
    });
    if (!token) {
      throw new ForbiddenException('Token not found or expired');
    }
    const match = await bcrypt.compare(dto.token, token.resetToken);
    if (!match) {
      throw new ForbiddenException('Token incorrect');
    }
    const hash = await bcrypt.hash(dto.password, 10);
    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        hash,
      },
    });
  }

  // Update the reset token in the database
  async createPasswordResetToken(id: string, token: string): Promise<void> {
    const hashedResetToken = await bcrypt.hash(token, 10);
    const expiresAfter = new Date();
    expiresAfter.setMinutes(expiresAfter.getMinutes() + 15);

    await this.prismaService.token.create({
      data: {
        userId: id,
        resetToken: hashedResetToken,
        resetTokenExpiration: expiresAfter,
      },
    });
  }

  // Verify the email
  async verifyEmail(token: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        emailVerificationToken: token,
        emailVerificationTokenExpiration: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      throw new ForbiddenException('Token not found or expired');
    }

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        email_verified: true,
        emailVerificationToken: null,
        emailVerificationTokenExpiration: null,
      },
    });
  }

  // Generate access and refresh tokens
  async getTokens(
    id: string,
    email: string,
    name: string,
    shouldRemember: boolean = false,
    role: string = '',
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: id,
      email: email,
      name: name,
      shouldRemember,
      role,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('JWT_SECRET'),
        expiresIn: shouldRemember ? '1d' : '4h',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('JWT_SECRET'),
        expiresIn: '1d',
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
