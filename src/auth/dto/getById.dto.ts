import { IsString, IsNotEmpty } from 'class-validator';

export class GetByIdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
