import {
    Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query
} from '@nestjs/common';
import { ApiConflictResponse, ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PaginationQuery } from '../common/dto/paginationQuery';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiConflictResponse({ description: 'This product Exist' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() paginationQuery: PaginationQuery) {
    return this.productsService.findAll(paginationQuery);
  }
  @ApiResponse({
    status: 409,
    description: 'Product not exist',
    type: Product,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.CREATED)
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  //https://developer.mozilla.org/es/docs/Web/HTTP/Methods/DELETE
  //Un código de estado 202 (Accepted) si la acción ha sido exitosa pero aún no se ha ejecutado.
  //Un código de estado 204 (en-US) (No Content) si la acción se ha ejecutado y no se debe proporcionar más información.
  //Un código de estado 200 (OK) si la acción se ha ejecutado y el mensaje de respuesta incluye una representación que describe el estado.
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.productsService.remove(id);
  }
}
