import { IdDto } from 'src/common/dto/id-product.dto';

import {
    Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query
} from '@nestjs/common';
import {
    ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation,
    ApiResponse, ApiTags
} from '@nestjs/swagger';

import { PaginationQuery } from '../common/dto/query.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new product' })
  @ApiBody({
    type: CreateProductDto,
    description: 'Data for new product',
  })
  @ApiCreatedResponse({
    description: 'Product created',
    type: Product,
  })
  @ApiResponse({
    status: 409,
    description: 'This product Exist',
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'List of products' })
  findAll(@Query() paginationQuery: PaginationQuery) {
    return this.productsService.findAll(paginationQuery);
  }
  @ApiResponse({
    status: 409,
    description: 'Product not exist',
  })
  @Get(':id')
  findOne(@Param() idDto: IdDto) {
    return this.productsService.findOne(idDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product' })
  @ApiBody({
    type: UpdateProductDto,
    description: 'Data for update product',
  })
  @ApiCreatedResponse({
    description: 'Product update',
    type: Product,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not exist',
  })
  update(@Param() idDto: IdDto, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(idDto, updateProductDto);
  }

  @Delete(':id')
  remove(@Param() idDto: IdDto) {
    return this.productsService.remove(idDto);
  }
}
