import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Hotel } from './hotel.dao';

@Entity('service_type')
export class ServiceType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(type => Hotel, hotels => hotels.serviceType, {
    nullable: false
  })
  hotels: Hotel[];
}
