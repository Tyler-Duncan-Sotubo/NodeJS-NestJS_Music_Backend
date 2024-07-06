import { IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';

export class AudioReleaseDto {
  @IsObject()
  @IsNotEmpty()
  user: object;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  artist: string;

  @IsString()
  @IsNotEmpty()
  primaryGenre: string;

  @IsString()
  @IsNotEmpty()
  secondaryGenre: string;

  @IsString()
  @IsNotEmpty()
  language: string;

  @IsString()
  @IsNotEmpty()
  releaseDate: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  copyrightHolder: string;

  @IsString()
  @IsNotEmpty()
  copyrightYear: string;

  @IsString()
  @IsNotEmpty()
  productionHolder: string;

  @IsString()
  @IsNotEmpty()
  productionYear: string;

  @IsString()
  @IsNotEmpty()
  releaseCover: string;

  @IsString()
  @IsOptional()
  releaseAudio: string;

  @IsString()
  @IsOptional()
  releaseAudioLink: string;

  @IsString()
  @IsOptional()
  lyrics: string;

  @IsString()
  @IsOptional()
  imageFileName: string;

  @IsString()
  @IsOptional()
  audioFileName: string;
}
