import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Hotel } from './hotel.dao';
import { BoardBasis } from './board_basis.dao';

@Entity('hotel_board_basis')
export class HotelBoardBasis {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Hotel, hotels => hotels.hotelBoardBasis)
  hotel: Hotel;

  @ManyToOne(type => BoardBasis, boardBasis => boardBasis.hotelBoardBasis)
  boardBasis: BoardBasis;

  @Column({ nullable: true })
  price: number;
}
