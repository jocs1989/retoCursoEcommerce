import * as request from 'supertest';

import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { conf } from '../../src/config/config';
import { configBD } from '../../src/config/db.config';
import { CreateProductDto } from '../../src/products/dto/create-product.dto';
import { ProductsModule } from '../../src/products/products.module';

describe('[Feature] Products - /products', () => {
  const productt = {
    name: 'ROMWE Fairycore Top 1',
    description:
      'ROMWE Fairycore Top con bordado floral de manga farol bustier crop con encaje',
    price: 205,
    images: [
      'https://img.ltwebstatic.com/images3_pi/2024/03/01/5f/1709259654fb5f7a335d850bb08ecf39a02fc484aa.webp',
      'https://img.ltwebstatic.com/images3_pi/2024/03/01/b0/1709259665e1056e392c8e6f70d485a840ae674d72.webp',
      'https://img.ltwebstatic.com/images3_spmp/2024/01/02/5f/1704179862a8650a690c497866c78ba542a39a83e7.webp',
    ],
    stock: 21,
    brand: 'SHEIN',
  };
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: [conf[process.env.NODE_ENV]],
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule.forFeature(configBD)],
          inject: [configBD.KEY],
          useFactory: (configService: ConfigType<typeof configBD>) => ({
            type: 'postgres',
            host: configService.host,
            port: configService.port,
            username: configService.user,
            password: configService.password,
            database: configService.nameDb,
            autoLoadEntities: true,
            entities: [],
            synchronize: true, // modo developer
          }),
        }),
        ProductsModule,
      ], // module for testing
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
  });
  // testig for controllers
  it('Create [POST /]', () => {
    return request(app.getHttpServer())
      .post('/products')
      .send(productt as CreateProductDto)
      .expect(HttpStatus.CREATED);
  });
  it('Get all [GET /]', () => {});
  it('Update one [PATCH /:id]', () => {});
  it('Delete one [DELETE /:id]', () => {});
});
