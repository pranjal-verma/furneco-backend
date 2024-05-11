import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  password: string;
}
