import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UserInfo, user, UserSubscription } from './dummy';

describe('UserService', () => {
  let service: UserService;

  const mockPrisma = {
    userInformation: {
      findMany: () =>
        Promise.resolve({
          id: user.id,
        }),
      findUnique: () => Promise.resolve({}),
      create: () => Promise.resolve({}),
      update: () => Promise.resolve({}),
      updateMany: () => Promise.resolve({}),
    },
    subscriptions: {
      create: () => Promise.resolve({}),
      update: () =>
        Promise.resolve({
          id: user.id,
        }),
      findMany: () =>
        Promise.resolve({
          id: user.id,
        }),
      updateMany: () =>
        Promise.resolve({
          id: user.id,
        }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Get User information
  it('should get user information', async () => {
    jest.spyOn(mockPrisma.userInformation, 'findMany').mockResolvedValueOnce({
      id: user.id,
    });
    const result = await service.getAccountInformation(user);
    expect(result).toEqual({
      message: 'User Information Not Found',
    });
  });

  // Create Account Information
  it('should create account information', async () => {
    jest
      .spyOn(mockPrisma.userInformation, 'create')
      .mockResolvedValueOnce(UserInfo);
    const result = await service.createAccountInformation(UserInfo);
    expect(result).toEqual(UserInfo);
  });

  // Update Account Information
  it('should update account information', async () => {
    jest
      .spyOn(mockPrisma.userInformation, 'update')
      .mockResolvedValueOnce(UserInfo);
    const result = await service.updateAccountInformation(UserInfo);
    expect(result).toEqual('User Information Updated');
  });

  // Create User Subscription
  it('should create user subscription', async () => {
    jest
      .spyOn(mockPrisma.subscriptions, 'create')
      .mockResolvedValueOnce(UserSubscription);
    jest
      .spyOn(mockPrisma.subscriptions, 'update')
      .mockResolvedValueOnce({ id: user.id });
    const result = await service.createSubscription(UserSubscription);
    expect(result).toEqual('User Subscription Created');
  });

  // Get User Subscription
  it('should get user subscription', async () => {
    jest
      .spyOn(mockPrisma.subscriptions, 'findMany')
      .mockResolvedValueOnce({ id: user.id });
    const result = await service.getSubscription(user);
    expect(result).toEqual({ message: 'User Subscription Not Found' });
  });

  // Update User Subscription
  it('should update user subscription', async () => {
    jest
      .spyOn(mockPrisma.subscriptions, 'updateMany')
      .mockResolvedValueOnce({ id: user.id });
    const result = await service.updateSubscription(user);
    expect(result).toEqual('User Subscription Updated');
  });
});
