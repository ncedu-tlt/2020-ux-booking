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

@Entity('distance')
export class Distance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  distanceOfCenter: string;

  @Column()
  distanceOfMetro: string;

  @Column()
  distanceOfBeach: string;

  @ManyToOne(type => Hotel, hotel => hotel.distance)
  hotel: Hotel;
}
