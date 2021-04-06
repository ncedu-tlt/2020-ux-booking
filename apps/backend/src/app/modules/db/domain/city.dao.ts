import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Country } from './countries.dao';
import { Address } from './addresses.dao';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(type => Country, country => country.cities)
  country: Country;

  @OneToMany(type => Address, addresses => addresses.city)
  addresses: Address[];
}
