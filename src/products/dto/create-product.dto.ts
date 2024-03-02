import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  readonly images: string[];

  @IsInt()
  @IsNotEmpty()
  readonly stock: number;

  @IsString()
  @IsNotEmpty()
  readonly brand: string;
}
