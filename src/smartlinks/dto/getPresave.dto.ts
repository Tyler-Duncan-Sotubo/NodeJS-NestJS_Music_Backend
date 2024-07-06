import { IsString, IsNotEmpty } from 'class-validator';

export class GetPreSaveDto {
  @IsString()
  @IsNotEmpty()
  url: string;
}
