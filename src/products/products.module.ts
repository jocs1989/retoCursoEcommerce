import { IamModule } from 'src/iam/iam.module';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './entities/product.entity';
import { Image } from './images/entities/image.entity';
import { ImagesController } from './images/images.controller';
import { ImagesService } from './images/images.service';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Image]), IamModule],
  controllers: [ProductsController, ImagesController],
  providers: [ProductsService, ImagesService],
})
export class ProductsModule {}
