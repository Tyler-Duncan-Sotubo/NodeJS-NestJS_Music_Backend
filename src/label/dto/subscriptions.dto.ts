import { IsNotEmpty, IsString } from 'class-validator';

export class SubscriptionDto {
  @IsString()
  @IsNotEmpty()
  labelId: string;

  @IsString()
  @IsNotEmpty()
  artistId: string;

  @IsString()
  @IsNotEmpty()
  artistSubscriptionId: string;
}
