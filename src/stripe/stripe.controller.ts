import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { StripeDto } from './dto';
import { StripeService } from './stripe.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/common/decorator';
import { JwtGuard } from 'src/common/guard';

@Controller('api/stripe')
@UseGuards(JwtGuard)
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post()
  async checkout(@GetUser() user: User, @Body() dto: StripeDto) {
    return this.stripeService.checkout(user, dto);
  }
}
