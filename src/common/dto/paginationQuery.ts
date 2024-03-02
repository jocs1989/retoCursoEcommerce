import { IsNumberString, IsOptional } from 'class-validator';

export class PaginationQuery {
  @IsOptional()
  @IsNumberString({ no_symbols: true })
  readonly limit?: number;

  @IsOptional()
  @IsNumberString({ no_symbols: true })
  readonly offset?: number;
}
