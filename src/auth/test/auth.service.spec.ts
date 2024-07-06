import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './../auth.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordResetService } from '../../mail/passwordReset.service';
import { VerifyEmailService } from '../../mail/verifyEmail.service';
// import * as bcrypt from 'bcrypt';
// import * as crypto from 'crypto';
// import {
//   RegisterDto,
//   LoginDto,
//   getUserByIdDto,
//   PasswordResetDto,
//   user,
// } from './dummy';

describe('AuthService', () => {
  let service: AuthService;

  const mockPrisma = {
    user: {
      findMany: () => Promise.resolve([]),
      findUnique: () => Promise.resolve({}),
      create: () => Promise.resolve({}),
      update: () => Promise.resolve({}),
      updateMany: () => Promise.resolve({}),
    },
    token: {
      create: () => Promise.resolve({}),
      delete: () => Promise.resolve({}),
      findFirst: () => Promise.resolve({}),
    },
  };

  const mockPasswordResetService = {
    sendPasswordResetEmail: jest.fn(),
  };

  const mockVerifyEmailService = {
    sendVerifyEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        ConfigService,
        JwtService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
        {
          provide: PasswordResetService,
          useValue: mockPasswordResetService,
        },
        {
          provide: VerifyEmailService,
          useValue: mockVerifyEmailService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // // Register
  // it('should create a user', async () => {
  //   jest.spyOn(mockPrisma.user, 'create').mockResolvedValueOnce(user);
  //   jest.spyOn(mockPrisma.user, 'update').mockResolvedValueOnce(user);

  //   const token = await service.getTokens(
  //     user.id,
  //     user.email,
  //     user.name,
  //     false,
  //     user.role,
  //   );

  //   const result = await service.register(RegisterDto);
  //   expect(result).toEqual(token);
  //   expect(mockPrisma.user.create).toHaveBeenCalledTimes(1);
  //   expect(mockVerifyEmailService.sendVerifyEmail).toHaveBeenCalled();
  // });

  // // Login
  // it('should login a user', async () => {
  //   jest.spyOn(mockPrisma.user, 'findUnique').mockResolvedValueOnce(user);
  //   jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(user.hash);
  //   jest.spyOn(mockPrisma.user, 'update').mockResolvedValueOnce(user);

  //   const token = await service.getTokens(
  //     user.id,
  //     user.email,
  //     user.name,
  //     false,
  //     user.role,
  //   );

  //   const result = await service.login(LoginDto);
  //   expect(result).toEqual(token);

  //   expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
  //     where: {
  //       email: 'test@test.com',
  //     },
  //   });
  //   expect(bcrypt.compare).toHaveBeenCalled();
  //   expect(mockPrisma.user.update).toHaveBeenCalled();
  // });

  // // Logout
  // it('should logout a user', async () => {
  //   jest.spyOn(mockPrisma.user, 'updateMany').mockResolvedValueOnce(user);
  //   await service.logout(getUserByIdDto);
  //   expect(mockPrisma.user.updateMany).toHaveBeenCalledWith({
  //     where: {
  //       id: '1',
  //       hashedRefreshToken: {
  //         not: null,
  //       },
  //     },
  //     data: {
  //       hashedRefreshToken: null,
  //     },
  //   });
  // });

  // // Forgot Password
  // it('should send a password reset email', async () => {
  //   // Check if user exists
  //   jest.spyOn(mockPrisma.user, 'findUnique').mockResolvedValueOnce(user);
  //   jest.spyOn(crypto, 'randomBytes').mockImplementationOnce(() => '123456');
  //   expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
  //     where: {
  //       email: user.email,
  //     },
  //   });
  //   await service.passwordResetHandler({ email: user.email });
  //   expect(
  //     mockPasswordResetService.sendPasswordResetEmail,
  //   ).toHaveBeenCalledWith(user.email, '123456');
  // });

  // // Reset Password
  // it('should reset a user password', async () => {
  //   // Mocking the Prisma service
  //   jest.spyOn(mockPrisma.user, 'findUnique').mockResolvedValueOnce(user);
  //   jest.spyOn(mockPrisma.user, 'update').mockResolvedValueOnce(user);
  //   jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(user.hash);
  //   jest.spyOn(mockPrisma.token, 'findFirst').mockResolvedValueOnce(user);

  //   //act
  //   await service.resetPassword(PasswordResetDto);

  //   // assertions
  //   expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
  //     where: {
  //       email: user.email,
  //     },
  //   });
  //   expect(mockPrisma.token.findFirst).toHaveBeenCalled();
  //   expect(bcrypt.compare).toHaveBeenCalled();
  //   expect(mockPrisma.user.update).toHaveBeenCalled();
  // });
});
