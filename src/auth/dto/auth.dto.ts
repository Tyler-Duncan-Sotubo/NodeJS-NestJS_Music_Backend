import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class AuthDto {
  @IsOptional()
  @IsBoolean()
  shouldRemember: boolean;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
