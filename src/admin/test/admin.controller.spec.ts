import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from '../admin.controller';
import { AdminService } from '../admin.service';
import { login, id, user, audio, Subscription } from './dummy';

describe('AdminController', () => {
  let controller: AdminController;

  const mockAdminService = {
    login: jest.fn(() => {
      return login;
    }),
    logout: jest.fn(() => {
      return 'Logout Success';
    }),
    users: jest.fn(() => {
      return [];
    }),
    user: jest.fn(() => {
      return {};
    }),
    updateUser: jest.fn(() => {
      return {};
    }),
    audios: jest.fn(() => {
      return [];
    }),
    audio: jest.fn(() => {
      return {};
    }),
    updateAudio: jest.fn(() => {
      return {};
    }),
    subscriptions: jest.fn(() => {
      return [];
    }),
    subscription: jest.fn(() => {
      return {};
    }),
    updateSubscription: jest.fn(() => {
      return {};
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: AdminService,
          useValue: mockAdminService,
        },
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Auth Logic
  it('should login Admin', async () => {
    await expect(controller.login(login)).resolves.toEqual(login);
    expect(mockAdminService.login).toHaveBeenCalledWith(login);
  });

  // Logout Admin
  it('should logout Admin', async () => {
    await expect(controller.logout(id)).resolves.toEqual('Logout Success');
    expect(mockAdminService.logout).toHaveBeenCalledWith(id);
  });

  // Get Users
  it('should get all users', async () => {
    await expect(controller.users()).resolves.toEqual([]);
    expect(mockAdminService.users).toHaveBeenCalled();
  });

  // Get User By Id
  it('should get user by id', async () => {
    await expect(controller.user(id)).resolves.toEqual({});
    expect(mockAdminService.user).toHaveBeenCalled();
  });

  // Update User
  it('should update user', async () => {
    await expect(controller.updateUser(id, user)).resolves.toEqual({});
    expect(mockAdminService.user).toHaveBeenCalled();
  });

  // Get Audios
  it('should get all audios', async () => {
    await expect(controller.audios()).resolves.toEqual([]);
    expect(mockAdminService.audios).toHaveBeenCalled();
  });

  // get Audio By Id
  it('should get audio by id', async () => {
    await expect(controller.audio(id)).resolves.toEqual({});
    expect(mockAdminService.audio).toHaveBeenCalled();
  });

  // Update Audio
  it('should update audio', async () => {
    await expect(controller.updateAudio(id, audio)).resolves.toEqual({});
    expect(mockAdminService.updateAudio).toHaveBeenCalled();
  });

  // Get Subscriptions
  it('should get all subscriptions', async () => {
    await expect(controller.subscriptions()).resolves.toEqual([]);
    expect(mockAdminService.subscriptions).toHaveBeenCalled();
  });

  // Get Subscription By Id
  it('should get subscription by id', async () => {
    await expect(controller.subscription(id)).resolves.toEqual({});
    expect(mockAdminService.subscription).toHaveBeenCalled();
  });

  // Update Subscription
  it('should update subscription', async () => {
    await expect(
      controller.updateSubscription(id, Subscription),
    ).resolves.toEqual({});
    expect(mockAdminService.updateSubscription).toHaveBeenCalled();
  });
});
