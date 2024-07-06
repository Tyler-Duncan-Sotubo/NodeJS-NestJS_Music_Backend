import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
