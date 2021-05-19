import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Hotel } from './hotel.dao';
import { Service } from './service.dao';
import { Room } from './room.dao';
import { Amenities } from './ameniries.dao';
import { User } from './user.dao';

@Entity('photos')
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  src: string;

  @OneToMany(type => Service, services => services.icon, {
    nullable: false,
    onDelete: 'SET NULL'
  })
  services: Promise<Service[]>;

  @OneToMany(type => Hotel, hotel => hotel.mainPhoto)
  hotelMainPhoto: Hotel;

  @ManyToOne(type => Hotel, hotels => hotels.photos, {
    nullable: true /*false*/,
    onDelete: 'SET NULL'
  })
  hotel: /*Hotel*/ Promise<Hotel>;

  @ManyToOne(type => Room, rooms => rooms.photos, {
    nullable: true /*false*/,
    onDelete: 'SET NULL'
  })
  room: Promise<Room>;

  @OneToMany(type => Amenities, amenities => amenities.icon, {
    nullable: false,
    onDelete: 'SET NULL'
  })
  amenities: Promise<Amenities>;
}
