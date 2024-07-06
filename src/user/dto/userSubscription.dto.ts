import { IsNotEmpty, IsString } from 'class-validator';

export class UserSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  subscriptionPlan: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
