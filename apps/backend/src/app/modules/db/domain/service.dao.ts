import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Photo } from './photo.dao';
import { Hotel } from './hotel.dao';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  name: string;

  // @ManyToOne(type => Categories, category => category.services)
  // category: Categories;

  @ManyToOne(type => Photo, icon => icon.services)
  icon: Photo;

  @ManyToMany(type => Hotel, hotels => hotels.services)
  hotels: Hotel[];
}
