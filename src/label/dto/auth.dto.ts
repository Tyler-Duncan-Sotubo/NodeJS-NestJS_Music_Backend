import { IsNotEmpty, IsEmail, IsString, IsOptional } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsNotEmpty()
  name: string;
}
