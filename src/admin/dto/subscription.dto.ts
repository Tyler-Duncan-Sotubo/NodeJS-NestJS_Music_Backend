import { IsOptional, IsString } from 'class-validator';

export class SubscriptionDto {
  @IsString()
  @IsOptional()
  plan: string;

  @IsString()
  @IsOptional()
  status: string;
}
