import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BoardBasis } from './board_basis.dao';
import { Room } from './room.dao';
import { Booking } from './booking.dao';

@Entity('booking_details')
export class BookingDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal' })
  price: number;

  @ManyToOne(type => Room, rooms => rooms.bookingDetails)
  room: Room;

  @ManyToOne(type => BoardBasis, boardBasis => boardBasis.bookingDetails)
  boardBasis: BoardBasis;

  @OneToOne(type => Booking, booking => booking.bookingDetail)
  booking: BookingDetail;
}
