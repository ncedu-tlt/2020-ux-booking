import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Booking } from './booking.dao';

@Entity('booking_conditions')
export class BookingCondition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  descriptions: string;

  @ManyToMany(type => Booking, booking => booking.bookingConditions)
  bookings: Booking[];
}
