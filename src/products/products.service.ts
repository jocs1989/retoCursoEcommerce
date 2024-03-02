import { PaginationQuery } from 'src/common/dto/paginationQuery';
import { DataSource, Repository } from 'typeorm';

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Image } from './images/entities/image.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly dataSource: DataSource,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const { images, ...allProducts } = createProductDto;
      const img = images.map((url) => this.imageRepository.create({ url }));
      const newProduct = this.productRepository.create({
        ...allProducts,
        images: img,
      });
      return await this.productRepository.save(newProduct);
    } catch (err) {
      const pgUniqueViolationErrorCode = '23505';
      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException('This product Exist');
      }
    }
  }

  async findAll(paginationQuery: PaginationQuery): Promise<Product[]> {
    const { limit = 10, offset = 0 } = paginationQuery;
    return await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: { images: true },
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { images: true },
    });
    if (!product) {
      throw new NotFoundException('Product not exist');
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { images, ...allProducts } = updateProductDto;

    const product = await this.productRepository.preload({
      id,
      ...allProducts,
    });

    if (!product) {
      throw new NotFoundException('Product not exist');
    }

    //Use createQueryRunner method to create a new QueryRunner:
    const queryRunner = this.dataSource.createQueryRunner();
    //After you create a new instance of QueryRunner use connect method to actually obtain a connection from the connection pool:
    await queryRunner.connect();
    // lets now open a new transaction:
    await queryRunner.startTransaction();
    try {
      if (images) {
        await queryRunner.manager.delete(Image, { products: { id } });
        product.images = images.map((url) =>
          this.imageRepository.create({ url }),
        );
      } else {
        product.images = await this.imageRepository.findBy({
          products: { id },
        });
      }

      // save product
      await queryRunner.manager.save(product);
      // commit transaction now:
      await queryRunner.commitTransaction();
      return product;
    } catch (err) {
      // since we have errors let's rollback changes we made
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
  }

  async remove(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { images: true },
    });
    if (!product) {
      throw new NotFoundException('Product not exist');
    }
    this.productRepository.remove(product);
    return product;
  }
}
