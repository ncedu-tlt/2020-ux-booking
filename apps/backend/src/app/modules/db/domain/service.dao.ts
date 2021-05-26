import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Photo } from './photo.dao';
import { Hotel } from './hotel.dao';
import { User } from './user.dao';
import { Categories } from './categories.dao';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    nullable: true
  })
  price: number;

  @Column()
  name: string;

  @Column({
    nullable: true
  })
  icon: string;

  @ManyToOne(type => Categories, category => category.services)
  category: Categories;

  @ManyToMany(type => Hotel, hotels => hotels.services, {
    nullable: false
  })
  hotels: Hotel[];
}
