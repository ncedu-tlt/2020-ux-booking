import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './user.dao';
import { BookingDetail } from './booking_detail.dao';

@Entity('booking')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => User, users => users.bookings, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'date' })
  dateOn: string;

  @Column({ type: 'date' })
  dateOff: string;

  @Column({ type: 'decimal' })
  totalPrice: number;

  @OneToMany(type => BookingDetail, bookingDetail => bookingDetail.booking)
  bookingDetails: BookingDetail[];
}
