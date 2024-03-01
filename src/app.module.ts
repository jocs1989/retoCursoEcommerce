import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { conf } from './config/config';
import { configBD } from './config/db.config';
import { ProductsModule } from './products/products.module';

@Module({
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
