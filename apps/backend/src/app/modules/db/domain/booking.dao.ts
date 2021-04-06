import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.dao';
import { BookingCondition } from './booking_conditions.dao';
import { BookingDetail } from './booking_detail.dao';

@Entity('booking')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => User, users => users.bookings)
  user: User;

  @Column({ type: 'date' })
  dateOn: string;

  @Column({ type: 'date' })
  dateOff: string;

  @Column({ type: 'decimal' })
  totalPrice: number;

  @OneToOne(
    type => BookingDetail,
    bookingDetail => bookingDetail.booking
  )
  bookingDetail: BookingDetail;

  @ManyToMany(
    type => BookingCondition,
    bookingConditions => bookingConditions.bookings
  )
  bookingConditions: BookingCondition[];
}
