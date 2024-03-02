import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Image } from '../images/entities/image.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @Column()
  description: string;

  @Column('numeric')
  price: number;

  @Column('int')
  stock: number;

  @Column('text')
  brand: string;

  @Column('boolean', { default: true })
  available: boolean;

  @OneToMany(() => Image, (image) => image.products, { cascade: true })
  images: Image[];
}
