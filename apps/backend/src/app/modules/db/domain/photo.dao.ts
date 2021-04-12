import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Hotel } from './hotel.dao';
import { Service } from './service.dao';
import { Room } from './room.dao';
import { Amenities } from './ameniries.dao';

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
  services: Service[];

  @ManyToOne(type => Hotel, hotels => hotels.photos, {
    nullable: false,
    onDelete: 'SET NULL'
  })
  hotel: Hotel;

  @ManyToOne(type => Room, rooms => rooms.photos, {
    nullable: false,
    onDelete: 'SET NULL'
  })
  room: Room;

  @OneToMany(type => Amenities, amenities => amenities.icon, {
    nullable: false,
    onDelete: 'SET NULL'
  })
  amenities: Amenities;
}
