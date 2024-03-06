import { DataSource } from 'typeorm';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { conf } from './config/config';
import { configBD } from './config/db.config';
import { TypeOrmConfigService } from './config/typeorm.config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false, // esta opcion es false si cuenta con archivo de variables de entorno
      envFilePath: [conf[process.env.NODE_ENV]],
      load: [configBD], //Archivo que carga las variables de entorno de la base de datos
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(configBD)],
      useClass: TypeOrmConfigService,
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
