import { IsUUID } from 'class-validator';

export class IdDto {
  @IsUUID(4)
  readonly id: string;
}
