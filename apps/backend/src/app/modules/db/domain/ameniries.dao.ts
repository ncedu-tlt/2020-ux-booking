import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Photo } from './photo.dao';
import { AmenitiesRoom } from './amenities_room.dao';

@Entity('amenities')
export class Amenities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  default: boolean;

  @ManyToOne(type => Photo, photos => photos.amenities)
  icon: Photo;

  @OneToMany(type => AmenitiesRoom, amenitiesRooms => amenitiesRooms.amenities)
  amenitiesRooms: AmenitiesRoom[];
}
