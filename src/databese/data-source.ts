import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'Admin',
  password: 'root',
  database: 'ecommerce_prod',
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'ecommerce_migrations',
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  subscribers: [],
});
