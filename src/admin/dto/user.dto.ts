import { IsEmail, IsString, IsBoolean, IsOptional } from 'class-validator';

export class UserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  email_verified: boolean;

  @IsString()
  @IsOptional()
  role: string;

  @IsEmail()
  @IsOptional()
  email: string;
}
