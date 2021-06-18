import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Hotel } from './hotel.dao';

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
