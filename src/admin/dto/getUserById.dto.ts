import { IsNotEmpty, IsString } from 'class-validator';

export class UserByIdDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
