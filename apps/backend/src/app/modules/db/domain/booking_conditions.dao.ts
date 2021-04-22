import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Hotel } from './hotel.dao';

@Entity('booking_conditions')
export class BookingCondition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  descriptions: string;

  @ManyToMany(type => Hotel, hotel => hotel.bookingConditions, {
    nullable: false
  })
  hotels: Promise<Hotel[]>;
}
