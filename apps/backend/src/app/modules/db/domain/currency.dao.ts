import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Hotel } from './hotel.dao';

@Entity('currencies')
export class Currency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(type => Hotel, hotels => hotels.currencies, {
    nullable: false
  })
  hotels: Hotel[];
}
