import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AmenitiesRoom } from './amenities_room.dao';

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
