import { IsNumberString, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class PaginationQuery {
  @ApiProperty({
    description: 'Número máximo de resultados a devolver',
    example: 10,
  })
  @IsOptional()
  @IsNumberString({ no_symbols: true })
  readonly limit?: number;

  @ApiProperty({
    description:
      'Número de resultados a omitir antes de comenzar a devolver datos',
    example: 0,
  })
  @IsOptional()
  @IsNumberString({ no_symbols: true })
  readonly offset?: number;
}
