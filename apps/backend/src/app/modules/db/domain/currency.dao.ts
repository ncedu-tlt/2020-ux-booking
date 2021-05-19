import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Hotel } from './hotel.dao';

@Entity('currency')
export class Currency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(type => Hotel, hotels => hotels.serviceType, {
    nullable: false
  })
  hotels: Promise<Hotel[]>;
}
