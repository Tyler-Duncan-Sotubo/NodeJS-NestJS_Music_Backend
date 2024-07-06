import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import {
  AuthDto,
  GetByEmailDto,
  GetByIdDto,
  PasswordResetDto,
  RegisterDto,
} from './dto';
import { Tokens } from './types';
import { RtGuard } from '../common/guard';
import { GetUser } from '../common/decorator';
import { Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private config: ConfigService,
  ) {}

  @Post('register')
  register(@Body() dto: RegisterDto): Promise<Tokens> {
    return this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.login(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Body() dto: GetByIdDto) {
    return this.authService.logout(dto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() dto: GetByEmailDto) {
    return this.authService.passwordResetHandler(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  resetPassword(@Body() dto: PasswordResetDto) {
    return this.authService.resetPassword(dto);
  }

  // Verify email
  @HttpCode(HttpStatus.OK)
  @Get('verify/:token')
  async verifyEmail(
    @Param('token') token: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      await this.authService.verifyEmail(token);
      res.redirect(302, `${this.config.get('CLIENT_URL')}/email-verified`);
    } catch (error) {
      if (error) {
        res.redirect(302, `${this.config.get('CLIENT_URL')}/verify-email`);
      }
    }
  }

  // Resend verification email
  @HttpCode(HttpStatus.OK)
  @Post('resend-verification-email')
  resendVerificationEmail(@Body() dto: GetByEmailDto) {
    return this.authService.resendVerificationEmail(dto);
  }

  // Refresh token
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  refresh(@GetUser() user: { refreshToken: string; email: string }) {
    return this.authService.refresh(user.email, user.refreshToken);
  }
}
