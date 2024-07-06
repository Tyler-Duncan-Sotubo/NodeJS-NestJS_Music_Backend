import { IsString, IsOptional } from 'class-validator';

export class AudioDto {
  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  smartLink: string;

  @IsString()
  @IsOptional()
  UPC: string;

  @IsString()
  @IsOptional()
  ISRC: string;

  @IsString()
  @IsOptional()
  releaseAudioLink: string;
}
