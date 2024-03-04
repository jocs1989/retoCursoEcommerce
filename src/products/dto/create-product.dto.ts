import {
    ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsNumber, IsString, Min
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Nombre del producto', example: 'Camiseta' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Camiseta de algodón de manga corta',
  })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ description: 'Precio del producto', example: 29.99 })
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({
    description: 'Array de URLs de las imágenes del producto',
    type: [String],
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  readonly images: string[];

  @ApiProperty({
    description: 'Cantidad de stock del producto',
    example: 100,
    minimum: 1,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  readonly stock: number;

  @ApiProperty({ description: 'Marca del producto', example: 'Nike' })
  @IsString()
  @IsNotEmpty()
  readonly brand: string;
}
