import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { City } from './city.dao';
import { User } from './user.dao';
import { Hotel } from './hotel.dao';
import { Categories } from './categories.dao';

@Entity('nearbyPlace')
export class NearbyPlaces {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(type => Hotel, hotel => hotel.nearbyPlaces)
  hotel: Hotel;
}
