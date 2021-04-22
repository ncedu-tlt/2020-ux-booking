import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Photo } from './photo.dao';
import { BookingDetail } from './booking_detail.dao';
import { Hotel } from './hotel.dao';
import { Bed } from './bed.dao';
import { AmenitiesRoom } from './amenities_room.dao';
import { User } from './user.dao';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  count: number;

  @Column()
  description: string;

  @Column()
  capacity: number;

  @ManyToMany(type => Bed, beds => beds.rooms, {
    nullable: false,
    onDelete: 'RESTRICT'
  })
  beds: Bed[];

  @ManyToOne(type => Hotel, hotel => hotel.rooms, {
    onDelete: 'CASCADE'
  })
  hotel: Promise<Hotel>;

  @OneToMany(type => Photo, photos => photos.room, {
    nullable: false
  })
  photos: Promise<Photo[]>;

  @OneToMany(type => AmenitiesRoom, amenitiesRoom => amenitiesRoom.room, {
    nullable: false,
    onDelete: 'RESTRICT'
  })
  amenitiesRoom: AmenitiesRoom[];

  @OneToMany(type => BookingDetail, bookingDetail => bookingDetail.room, {
    nullable: false
  })
  bookingDetails: Promise<BookingDetail[]>;
}
