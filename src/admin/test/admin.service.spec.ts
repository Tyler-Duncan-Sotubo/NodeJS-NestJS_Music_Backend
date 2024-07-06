import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from '../admin.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Subscription, audio, id, login, user } from './dummy';

describe('AdminService', () => {
  let service: AdminService;

  const mockPrisma = {
    admin: {
      findUnique: () => Promise.resolve({}),
      update: () => Promise.resolve({}),
    },
    user: {
      findMany: () => Promise.resolve([]),
      findUnique: () => Promise.resolve({}),
      create: () => Promise.resolve({}),
      update: () => Promise.resolve({}),
      updateMany: () => Promise.resolve({}),
    },
    audios: {
      findMany: () => Promise.resolve([]),
      findUnique: () => Promise.resolve({}),
      create: () => Promise.resolve({}),
      update: () => Promise.resolve({}),
      updateMany: () => Promise.resolve({}),
    },
    subscriptions: {
      findMany: () => Promise.resolve([]),
      findUnique: () => Promise.resolve({}),
      create: () => Promise.resolve({}),
      update: () => Promise.resolve({}),
      updateMany: () => Promise.resolve({}),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        JwtService,
        ConfigService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();
    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Auth
  it('should login Admin User', async () => {
    jest.spyOn(mockPrisma.admin, 'findUnique').mockResolvedValueOnce(user);
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);
    const result = await service.login(login);
    const token = await service.getTokens(user.id, user.email);
    expect(result).toEqual(token);
  });

  it('should logout Admin User', async () => {
    jest.spyOn(mockPrisma.admin, 'findUnique').mockResolvedValueOnce(user);
    const result = await service.logout(id);
    expect(result).toEqual('Logout Success');
  });

  // Users
  it('should get all Users', async () => {
    jest.spyOn(mockPrisma.user, 'findMany').mockResolvedValueOnce([user]);
    const result = await service.users();
    expect(result).toEqual([user]);
  });

  it('should get User by Id', async () => {
    jest.spyOn(mockPrisma.user, 'findUnique').mockResolvedValueOnce(user);
    const result = await service.user(id);
    expect(result).toEqual(user);
  });

  it('should update User', async () => {
    jest.spyOn(mockPrisma.user, 'update').mockResolvedValueOnce(user);
    const result = await service.updateUser(id, user);
    expect(result).toEqual(user);
  });

  // Audio
  it('should get all Audios', async () => {
    jest.spyOn(mockPrisma.audios, 'findMany').mockResolvedValueOnce([audio]);
    const result = await service.audios();
    expect(result).toEqual([audio]);
  });

  it('should get Audio by Id', async () => {
    jest.spyOn(mockPrisma.audios, 'findUnique').mockResolvedValueOnce(audio);
    const result = await service.audio(id);
    expect(result).toEqual(audio);
  });

  it('should update Audio', async () => {
    jest.spyOn(mockPrisma.audios, 'update').mockResolvedValueOnce(audio);
    const result = await service.updateAudio(id, audio);
    expect(result).toEqual(audio);
  });

  // Subscription
  it('should get all Subscriptions', async () => {
    jest.spyOn(mockPrisma.subscriptions, 'findMany').mockResolvedValueOnce([]);
    const result = await service.subscriptions();
    expect(result).toEqual([]);
  });

  it('should get Subscription by Id', async () => {
    jest
      .spyOn(mockPrisma.subscriptions, 'findUnique')
      .mockResolvedValueOnce({});
    const result = await service.subscription(id);
    expect(result).toEqual({});
  });

  it('should update Subscription', async () => {
    jest.spyOn(mockPrisma.subscriptions, 'update').mockResolvedValueOnce({});
    const result = await service.updateSubscription(id, Subscription);
    expect(result).toEqual({});
  });
});
