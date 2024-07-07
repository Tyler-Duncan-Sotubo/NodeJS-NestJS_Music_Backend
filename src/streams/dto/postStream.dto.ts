import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsObject,
  IsNumber,
} from 'class-validator';

export class PostStreamDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  audioId: string;

  @IsString()
  @IsNotEmpty()
  week_start: string;

  @IsString()
  @IsNotEmpty()
  week_end: string;

  @IsNumber()
  @IsNotEmpty()
  total_streams: number;

  @IsObject()
  @IsOptional()
  spotify: string;

  @IsObject()
  @IsOptional()
  apple: string;

  @IsObject()
  @IsOptional()
  amazon: string;

  @IsObject()
  @IsOptional()
  youtube: string;

  @IsObject()
  @IsOptional()
  tidal: string;

  @IsObject()
  @IsOptional()
  deezer: string;

  @IsObject()
  @IsOptional()
  boomPlay: string;

  @IsObject()
  @IsOptional()
  tiktok: string;

  @IsObject()
  @IsOptional()
  facebook: string;
}
