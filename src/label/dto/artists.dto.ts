import { IsNotEmpty, IsString } from 'class-validator';

export class ArtistDto {
  @IsString()
  @IsNotEmpty()
  labelId: string;

  @IsString()
  @IsNotEmpty()
  artistId: string;
}
