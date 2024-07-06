import {
  IsDefined,
  IsIn,
  IsString,
  MinLength,
  ValidateIf,
  IsNotEmpty,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class PasswordResetDto {
  @IsOptional()
  @IsString()
  token: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsDefined()
  @MinLength(4)
  password: string;

  @IsString()
  @IsDefined()
  @IsIn([Math.random()], {
    message: 'Passwords do not match',
  })
  @ValidateIf((o) => o.password !== o.password_confirmation)
  password_confirmation: string;
}
