import { Injectable, ForbiddenException } from '@nestjs/common';
import { UserInfoDto, UserSubscriptionDto } from './dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  // Get user information
  async getAccountInformation(user: User) {
    // Get user information
    const userInformation = await this.prismaService.userInformation.findMany({
      where: {
        userId: user.id,
      },
    });

    if (userInformation && userInformation.length > 0) {
      return userInformation[0];
    }

    return {
      message: 'User Information Not Found',
    };
  }

  // Create user information
  async createAccountInformation(userInfo: UserInfoDto) {
    // check if user information already exists
    const userInformation = await this.prismaService.userInformation.findMany({
      where: {
        userId: userInfo.userId,
      },
    });

    if (userInformation && userInformation.length > 0) {
      throw new ForbiddenException('User Information Already Exists');
    }

    // Create user information
    return await this.prismaService.userInformation.create({
      data: {
        ...userInfo,
        userId: userInfo.userId,
      },
    });
  }

  // Update user information
  async updateAccountInformation(userInfo: UserInfoDto) {
    // check if user information already exists
    const userInformation = await this.prismaService.userInformation.findMany({
      where: {
        userId: userInfo.userId,
      },
    });

    if (userInformation.length === 0) {
      throw new ForbiddenException('User Information Not Found');
    }

    // Update user information
    await this.prismaService.userInformation.updateMany({
      where: {
        userId: userInfo.userId,
      },
      data: {
        //  remove userId from userInfo object
        ...userInfo,
      },
    });

    return 'User Information Updated';
  }

  // Subscriptions  ----------------------------------------------------------------

  // Create user subscription
  async createSubscription(dto: UserSubscriptionDto) {
    // check if user subscription already exists
    const userSubscription = await this.prismaService.subscriptions.findMany({
      where: {
        userId: dto.userId,
      },
    });

    if (userSubscription && userSubscription.length > 0) {
      throw new ForbiddenException('User Subscription Already Exists');
    }

    // Get the current date
    const currentDate = new Date();
    // Add 1 year to the current date
    const oneYearLater = new Date(currentDate);
    oneYearLater.setFullYear(currentDate.getFullYear() + 1);

    // Create user subscription
    await this.prismaService.subscriptions.create({
      data: {
        userId: dto.userId,
        status: 'active',
        plan: dto.subscriptionPlan,
        expiresAt: oneYearLater,
      },
    });

    return 'User Subscription Created';
  }

  // Get user subscription
  async getSubscription(user: User) {
    // Get user subscription
    const userSubscription = await this.prismaService.subscriptions.findMany({
      where: {
        userId: user.id,
      },
    });

    if (userSubscription && userSubscription.length > 0) {
      return userSubscription[0];
    }

    return {
      message: 'User Subscription Not Found',
    };
  }

  // Update user subscription
  async updateSubscription(user: User) {
    // check if user subscription already exists
    const userSubscription = await this.prismaService.subscriptions.findMany({
      where: {
        userId: user.id,
      },
    });

    if (userSubscription.length === 0) {
      throw new ForbiddenException('User Subscription Not Found');
    }

    // Update user subscription
    await this.prismaService.subscriptions.updateMany({
      where: {
        userId: user.id,
      },
      data: {
        status: 'active',
      },
    });

    return 'User Subscription Updated';
  }
}
