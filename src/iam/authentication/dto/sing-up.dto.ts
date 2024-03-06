import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class SignUpDto {
  @Transform((item) => item.value.toString().trim())
  @IsEmail()
  readonly email: string;

  @Transform((item) => item.value.toString().trim())
  @IsString()
  readonly password: string;
}
