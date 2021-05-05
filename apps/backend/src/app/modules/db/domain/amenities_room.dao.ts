import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './room.dao';
import { Amenities } from './ameniries.dao';

@Entity('amenities_room')
export class AmenitiesRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal' })
  price: number;

  @ManyToOne(type => Room, room => room.amenitiesRoom)
  room: Room;

  @ManyToOne(type => Amenities, amenity => amenity.amenitiesRooms)
  amenities: Amenities;
}
