import { IsUUID } from 'class-validator';

export class IdImgDto {
  @IsUUID(4)
  readonly idImg: string;
}
