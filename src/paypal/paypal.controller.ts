import { Body, Controller, Post } from '@nestjs/common';
import { PayPalDto, OrderDto } from './dto';
import { PaypalService } from './paypal.service';

@Controller('paypal')
export class PaypalController {
  constructor(private paypalService: PaypalService) {}

  @Post('create-order')
  async createOrder(@Body() dto: PayPalDto) {
    return this.paypalService.createOrder(dto);
  }

  @Post('capture-transaction')
  async captureTransaction(@Body() dto: OrderDto) {
    return this.paypalService.captureOrder(dto);
  }
}
