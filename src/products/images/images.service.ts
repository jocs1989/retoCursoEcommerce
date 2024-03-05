import { IdDto } from 'src/common/dto/id-product.dto';
import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from '../entities/product.entity';
import { CreateImageDto } from './dto/create-image.dto';
import { IdImgDto } from './dto/id-image.dto';
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
  async create(idDto: IdDto, createImageDto: CreateImageDto) {
    const { id } = idDto;
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

  async findAll(idDto: IdDto) {
    const { id } = idDto;

    const imageProduct = await this.productRepository.findOne({
      where: { id },
      relations: ['images'],
    });
    if (!imageProduct) {
      throw new NotFoundException('Product not exist');
    }
    return imageProduct.images;
  }

  async findOne(idDto: IdDto, idImgDto: IdImgDto) {
    const { id } = idDto;
    const { idImg } = idImgDto;
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

  async update(
    idDto: IdDto,
    idImgDto: IdImgDto,
    updateImageDto: UpdateImageDto,
  ) {
    const { id } = idDto;
    const { idImg } = idImgDto;
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

  async remove(idDto: IdDto, idImgDto: IdImgDto) {
    const { id } = idDto;
    const { idImg } = idImgDto;
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
