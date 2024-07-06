import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OrderDto, PayPalDto } from './dto';
import fetch from 'node-fetch';

@Injectable()
export class PaypalService {
  private PAYPAL_CLIENT_ID = this.configService.get('PAYPAL_CLIENT_ID');
  private PAYPAL_CLIENT_SECRET = this.configService.get('PAYPAL_CLIENT_SECRET');
  private base = this.configService.get('PAYPAL_BASE');

  constructor(private configService: ConfigService) {}

  async generateAccessToken() {
    try {
      if (!this.PAYPAL_CLIENT_ID || !this.PAYPAL_CLIENT_SECRET) {
        throw new Error('MISSING_API_CREDENTIALS');
      }
      const auth = Buffer.from(
        this.PAYPAL_CLIENT_ID + ':' + this.PAYPAL_CLIENT_SECRET,
      ).toString('base64');
      const response = await fetch(`${this.base}/v1/oauth2/token`, {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Failed to generate Access Token:', error);
    }
  }

  async createOrder(dto: PayPalDto) {
    const accessToken = await this.generateAccessToken();
    const url = `${this.base}/v2/checkout/orders`;
    const payload = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: dto.price,
          },
          description: `${dto.product} - ${dto.description} - ${dto.customerID}`,
        },
      ],
    };

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return this.handleResponse(response);
  }

  async captureOrder(orderID: OrderDto) {
    const accessToken = await this.generateAccessToken();
    const url = `${this.base}/v2/checkout/orders/${orderID.orderID}/capture`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return this.handleResponse(response);
  }

  async handleResponse(response: any): Promise<any> {
    if (response.status === 201 || response.status === 200) {
      return await response.json();
    }

    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}
