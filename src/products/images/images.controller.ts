import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImagesService } from './images.service';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post(':id')
  create(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() createImageDto: CreateImageDto,
  ) {
    return this.imagesService.create(id, createImageDto);
  }

  @Get(':id')
  findAll(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.imagesService.findAll(id);
  }

  @Get(':id/:idImg')
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('idImg', new ParseUUIDPipe({ version: '4' })) idImg: string,
  ) {
    return this.imagesService.findOne(id, idImg);
  }

  @Patch(':id/:idImg')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('idImg', new ParseUUIDPipe({ version: '4' })) idImg: string,
    @Body() updateImageDto: UpdateImageDto,
  ) {
    return this.imagesService.update(id, idImg, updateImageDto);
  }

  @Delete(':id/:idImg')
  remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('idImg', new ParseUUIDPipe({ version: '4' })) idImg: string,
  ) {
    return this.imagesService.remove(id, idImg);
  }
}
