import { IsString, IsNotEmpty } from 'class-validator';

export class GetStreamDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  audioId: string;
}
