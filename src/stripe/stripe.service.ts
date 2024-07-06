import { ForbiddenException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_CLIENT_SECRET'), {
      apiVersion: '2024-04-10',
    });
  }

  async checkout(user: User, dto: StripeDto) {
    const userSubscription = await this.prismaService.subscriptions.findMany({
      where: {
        userId: user.id,
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
        userId: user.id,
        status: 'unpaid',
        plan: dto.product,
        expiresAt: oneYearLater,
      },
    });

    await this.prismaService.cardBillingInfo.create({
      data: {
        userId: user.id,
        name: dto.name,
        address: dto.address,
      },
    });

    return this.stripe.paymentIntents.create({
      amount: Number(dto.price) * 100,
      currency: 'usd',
      payment_method_types: ['card'],
      description: `Payment for ${dto.product} by ${user.email}`,
    });
  }
}
