import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class PreSaveDto {
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  artist: string;

  @IsString()
  @IsOptional()
  spotify: string;

  @IsString()
  @IsOptional()
  apple: string;

  @IsString()
  @IsOptional()
  itunes: string;

  @IsString()
  @IsOptional()
  amazon: string;

  @IsString()
  @IsOptional()
  youtube: string;

  @IsString()
  @IsOptional()
  tidal: string;

  @IsString()
  @IsOptional()
  deezer: string;

  @IsString()
  @IsOptional()
  boomPlay: string;

  @IsString()
  @IsOptional()
  audioMack: string;

  @IsString()
  @IsOptional()
  soundcloud: string;
}
