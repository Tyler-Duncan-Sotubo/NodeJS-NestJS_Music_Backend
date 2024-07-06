import { IsEmail, IsString } from 'class-validator';

export class GetByEmailDto {
  @IsString()
  @IsEmail()
  email: string;
}
