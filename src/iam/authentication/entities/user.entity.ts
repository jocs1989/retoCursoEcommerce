import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text', unique: true })
  email: string;
  @Column('text')
  password: string;
  @Column({ type: 'boolean', default: true })
  isActive: boolean;
  @Column({ type: 'text', array: true, default: ['USER'] })
  roles: string[];
}
