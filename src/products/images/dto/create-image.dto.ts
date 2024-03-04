import { IsString, IsUrl } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
  @ApiProperty({
    description: 'URL de la imagen',
    example: 'https://example.com/image1.jpg',
  })
  @IsString()
  @IsUrl()
  url: string;
}
