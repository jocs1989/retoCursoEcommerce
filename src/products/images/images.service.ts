import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from '../entities/product.entity';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}
  async create(id: string, createImageDto: CreateImageDto) {
    const imageProduct = await this.imageRepository.findOne({
      where: { products: { id } },
      relations: { products: true },
    });
    if (!imageProduct) {
      throw new NotFoundException('Product not exist');
    }
    const { products, ...rest } = imageProduct;

    const img = this.imageRepository.create({
      id,
      products,
      url: createImageDto.url,
    });
    return await this.imageRepository.save(img);
  }

  async findAll(id: string) {
    const imageProduct = await this.productRepository.findOne({
      where: { id },
      relations: ['images'],
    });
    if (!imageProduct) {
      throw new NotFoundException('Product not exist');
    }
    return imageProduct.images;
  }

  async findOne(id: string, idImg: string) {
    const imgProduct = await this.imageRepository.findOne({
      where: {
        products: { id },
        id: idImg,
      },
    });
    if (!imgProduct) {
      throw new NotFoundException('Image not exist');
    }
    return imgProduct;
  }

  async update(id: string, idImg: string, updateImageDto: UpdateImageDto) {
    const imageProduct = await this.imageRepository.preload({
      products: { id },
      id: idImg,
      url: updateImageDto.url,
    });
    if (!imageProduct) {
      throw new NotFoundException('Image not exist');
    }
    await this.imageRepository.save(imageProduct);
    return imageProduct;
  }

  async remove(id: string, idImg: string) {
    const imagesDelete = await this.imageRepository.findOne({
      where: {
        products: { id },
        id: idImg,
      },
      relations: { products: true },
    });

    if (!imagesDelete) {
      throw new NotFoundException('Image not exist');
    }
    this.imageRepository.remove(imagesDelete);
    //imagesDelete
    return await this.imageRepository.find({ where: { products: { id } } });
  }
}
