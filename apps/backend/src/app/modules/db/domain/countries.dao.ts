import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './city.dao';
import { User } from './user.dao';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(type => City, cities => cities.country, {
    nullable: false
  })
  cities: Promise<City[]>;
}
