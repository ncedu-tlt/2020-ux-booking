import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { Photo } from './photo.dao';
import { AmenitiesRoom } from './amenities_room.dao';
import { User } from './user.dao';

@Entity('amenities')
export class Amenities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  default: boolean;

  @Column()
  icon: string;

  @OneToMany(
    type => AmenitiesRoom,
    amenitiesRooms => amenitiesRooms.amenities,
    { nullable: false }
  )
  amenitiesRooms: Promise<AmenitiesRoom[]>;
}
