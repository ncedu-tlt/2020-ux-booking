import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HotelBoardBasis } from './hotel_board_basis.dao';
import { BookingDetail } from './booking_detail.dao';
import { User } from './user.dao';

@Entity('board_basis')
export class BoardBasis {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(
    type => HotelBoardBasis,
    hotelBoardBasis => hotelBoardBasis.boardBasis
  )
  hotelBoardBasis: Promise<HotelBoardBasis[]>;

  @OneToMany(
    type => BookingDetail,
    bookingDetails => bookingDetails.boardBasis,
    {
      nullable: false,
      onDelete: 'SET NULL'
    }
  )
  bookingDetails: Promise<BookingDetail>;
}
