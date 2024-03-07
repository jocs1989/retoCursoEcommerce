import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ description: 'email', example: 'undominio@uncorreo.com' })
  @Transform((item) => item.value.toString().trim())
  @IsEmail()
  readonly email: string;
  @ApiProperty({ description: 'password', example: '12345' })
  @Transform((item) => item.value.toString().trim())
  @IsString()
  readonly password: string;
}
