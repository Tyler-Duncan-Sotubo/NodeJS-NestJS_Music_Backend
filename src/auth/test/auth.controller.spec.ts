import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './../auth.controller';
import { AuthService } from './../auth.service';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import {
  tokens,
  RegisterDto,
  LoginDto,
  getUserByIdDto,
  getUserByEmailDto,
  PasswordResetDto,
} from './dummy';

describe('AuthController', () => {
  let controller: AuthController;

  // Mock Data

  const mockAuthService = {
    register: jest.fn(() => {
      return tokens;
    }),
    login: jest.fn(() => {
      return tokens;
    }),
    logout: jest.fn(),
    passwordResetHandler: jest.fn(),
    resetPassword: jest.fn(),
    resendVerificationEmail: jest.fn(),
    verifyEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        ConfigService,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Register
  it('should register a user and return tokens', async () => {
    expect(controller.register(RegisterDto)).toEqual(tokens);
    expect(mockAuthService.register).toHaveBeenCalledWith(RegisterDto);
  });

  // Login
  it('should login a user and return tokens', async () => {
    expect(controller.login(LoginDto)).toEqual(tokens);
    expect(mockAuthService.login).toHaveBeenCalledWith(LoginDto);
  });

  // Logout
  it('should logout a user', async () => {
    controller.logout(getUserByIdDto);
    expect(mockAuthService.logout).toHaveBeenCalledWith(getUserByIdDto);
  });

  // Forgot Password
  it('should send a password reset email', async () => {
    controller.forgotPassword(getUserByEmailDto);
    expect(mockAuthService.passwordResetHandler).toHaveBeenCalledWith(
      getUserByEmailDto,
    );
  });

  // Reset Password
  it('should reset a user password', async () => {
    controller.resetPassword(PasswordResetDto);
    expect(mockAuthService.resetPassword).toHaveBeenCalledWith(
      PasswordResetDto,
    );
  });

  // Resend Verification Email
  it('should resend a verification email', async () => {
    controller.resendVerificationEmail(getUserByEmailDto);
    expect(mockAuthService.resendVerificationEmail).toHaveBeenCalledWith(
      getUserByEmailDto,
    );
  });

  // Verify Email
  it('should verify a user email', async () => {
    const token: string = '3812639812698163912';
    const res = {
      redirect: jest.fn(),
    };
    controller.verifyEmail(
      token,
      res as unknown as Response<any, Record<string, any>>,
    );
    expect(mockAuthService.verifyEmail).toHaveBeenCalledWith(token);
  });
});
