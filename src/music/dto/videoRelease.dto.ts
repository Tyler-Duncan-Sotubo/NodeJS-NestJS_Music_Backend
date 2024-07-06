import { IsString, IsNotEmpty } from 'class-validator';

export class VideoReleaseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  keywords: string;

  @IsString()
  @IsNotEmpty()
  releaseDate: string;
}
