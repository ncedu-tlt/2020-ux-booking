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

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  part: string;

  @ManyToOne(type => City, city => city.addresses)
  city: City;

  @OneToMany(type => User, user => user.address)
  users: User[];

  @OneToMany(type => Hotel, hotels => hotels.address)
  hotels: Hotel[];
}
