import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { configBD } from './db.config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  private readonly logger = new Logger(TypeOrmConfigService.name);
  constructor(
    @Inject(configBD.KEY)
    private readonly configService: ConfigType<typeof configBD>,
  ) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    if (process.env.NODE_ENV === 'testing') {
      //testing
      this.logger.log('Mode testing');
      return {
        type: 'postgres',
        host: this.configService.host,
        port: this.configService.port,
        username: this.configService.user,
        password: this.configService.password,
        database: this.configService.nameDb,
        autoLoadEntities: true,
        //entities: [],
        //migrations: [],
        //migrationsTableName: '',
        synchronize: true,
      };
    } //testing
    if (process.env.NODE_ENV === 'production') {
      // production
      this.logger.log('Mode production');
      return {
        type: 'postgres',
        host: this.configService.host,
        port: this.configService.port,
        username: this.configService.user,
        password: this.configService.password,
        database: this.configService.nameDb,
        autoLoadEntities: true,
        migrations: ['dist/migrations/*.js'],
        migrationsTableName: 'ecommerce_migrations',
        entities: ['dist/**/*.entity.js'],
        synchronize: false,
      };
    } else {
      // "development"
      this.logger.log('Mode development');

      return {
        type: 'postgres',
        host: this.configService.host,
        port: this.configService.port,
        username: this.configService.user,
        password: this.configService.password,
        database: this.configService.nameDb,
        autoLoadEntities: true,
        synchronize: true,
      };
    }
  }
}
