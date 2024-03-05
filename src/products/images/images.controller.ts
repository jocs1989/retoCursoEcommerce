import { IdDto } from 'src/common/dto/id-product.dto';

import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateImageDto } from './dto/create-image.dto';
import { IdImgDto } from './dto/id-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImagesService } from './images.service';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post(':id')
  create(@Param() idDto: IdDto, @Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(idDto, createImageDto);
  }

  @Get(':id')
  findAll(@Param() idDto: IdDto) {
    return this.imagesService.findAll(idDto);
  }

  @Get(':id/:idImg')
  findOne(@Param() idDto: IdDto, @Param() idImgDto: IdImgDto) {
    return this.imagesService.findOne(idDto, idImgDto);
  }

  @Patch(':id/:idImg')
  update(
    @Param() idDto: IdDto,
    @Param() idImgDto: IdImgDto,
    @Body() updateImageDto: UpdateImageDto,
  ) {
    return this.imagesService.update(idDto, idImgDto, updateImageDto);
  }

  @Delete(':id/:idImg')
  remove(@Param() idDto: IdDto, @Param() idImgDto: IdImgDto) {
    return this.imagesService.remove(idDto, idImgDto);
  }
}
