import { IsNotEmpty, IsString } from 'class-validator';

export class GetLabelByIdDto {
  @IsString()
  @IsNotEmpty()
  labelId: string;
}
