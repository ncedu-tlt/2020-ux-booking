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

  @Column({ nullable: false })
  part: string;

  @ManyToOne(type => City, city => city.addresses)
  city: City;

  @OneToMany(type => User, user => user.address, {
    nullable: false,
    onDelete: 'CASCADE'
  })
  users: Promise<User[]>;

  @OneToMany(type => Hotel, hotels => hotels.address, {
    nullable: false,
    onDelete: 'CASCADE'
  })
  hotels: Promise<Hotel[]>;
}
