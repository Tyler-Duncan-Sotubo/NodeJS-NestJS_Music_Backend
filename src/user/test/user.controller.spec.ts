import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { UserInfo, UserSubscription, user } from './dummy';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    createAccountInformation: jest.fn(() => {
      return {
        UserInfo,
      };
    }),
    updateAccountInformation: jest.fn(() => {
      return {
        UserInfo,
      };
    }),
    createSubscription: jest.fn(() => {
      return 'User Subscription Created';
    }),
    getSubscription: jest.fn(() => {
      return UserSubscription;
    }),
    updateSubscription: jest.fn(() => {
      return {
        UserSubscription,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();
    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Create Account Information
  it('Should create account information', () => {
    expect(controller.createAccountInformation(UserInfo)).toEqual({
      UserInfo,
    });
    expect(mockUserService.createAccountInformation).toHaveBeenCalledWith(
      UserInfo,
    );
  });

  // Update Account Information
  it('Should update account information', () => {
    expect(controller.updateAccountInformation(UserInfo)).toEqual({
      UserInfo,
    });
    expect(mockUserService.updateAccountInformation).toHaveBeenCalledWith(
      UserInfo,
    );
  });

  // Create Subscription
  it('Should create subscription', () => {
    expect(controller.createSubscription(UserSubscription)).toEqual(
      'User Subscription Created',
    );
    expect(mockUserService.createSubscription).toHaveBeenCalledWith(
      UserSubscription,
    );
  });

  // Get User Subscription
  it('Should get user subscription', () => {
    expect(controller.getSubscription(user)).toEqual(UserSubscription);
    expect(mockUserService.getSubscription).toHaveBeenCalledWith(user);
  });

  // Update user subscription
  it('Should update user subscription', () => {
    expect(controller.updateSubscription(user)).toEqual({
      UserSubscription: UserSubscription,
    });
    expect(mockUserService.updateSubscription).toHaveBeenCalledWith(user);
  });
});
