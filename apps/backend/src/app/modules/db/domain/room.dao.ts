import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Photo } from './photo.dao';
import { BookingDetail } from './booking_detail.dao';
import { Hotel } from './hotel.dao';
import { Bed } from './bed.dao';
import { AmenitiesRoom } from './amenities_room.dao';

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

  @ManyToMany(type => Bed, beds => beds.rooms)
  beds: Bed[];

  @ManyToOne(type => Hotel, hotel => hotel.rooms)
  hotel: Hotel;

  @OneToMany(type => Photo, photos => photos.room)
  photos: Photo[];

  @OneToMany(type => AmenitiesRoom, amenitiesRoom => amenitiesRoom.room)
  amenitiesRoom: AmenitiesRoom[];

  @OneToMany(type => BookingDetail, bookingDetail => bookingDetail.room)
  bookingDetails: BookingDetail[];
}
