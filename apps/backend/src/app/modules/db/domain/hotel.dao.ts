import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Address } from './addresses.dao';
import { User } from './user.dao';
import { Currency } from './currency.dao';
import { Review } from './review.dao';
import { Comment } from './comment.dao';
import { ServiceType } from './service_type.dao';
import { Photo } from './photo.dao';
import { Service } from './service.dao';
import { PaymentMethod } from './payment_method.dao';
import { HotelBoardBasis } from './hotel_board_basis.dao';
import { Room } from './room.dao';
import { BookingCondition } from './booking_conditions.dao';

@Entity('hotels')
export class Hotel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  bookingPolicy: string;

  @Column()
  stars: number;

  @Column({ type: 'decimal' })
  minPrice: number;

  @Column()
  freeCancellation: boolean;

  @ManyToMany(type => User, user => user.bookmarks, {
    nullable: false
  })
  users: Promise<User[]>;

  @OneToMany(type => Review, reviews => reviews.hotel, {
    nullable: false,
    onDelete: 'SET NULL'
  })
  reviews: Promise<Review[]>;

  @OneToMany(type => Comment, comments => comments.hotel, {
    nullable: false,
    onDelete: 'SET NULL'
  })
  comments: Promise<Comment[]>;

  @ManyToMany(type => Service, services => services.hotels, {
    nullable: false,
    onDelete: 'RESTRICT'
  })
  @JoinTable()
  services: Service[];

  @ManyToOne(type => Address, address => address.hotels)
  address: Address;

  @ManyToOne(type => ServiceType, serviceType => serviceType.hotels)
  serviceType: ServiceType;

  @ManyToOne(type => Currency, currencies => currencies.hotels)
  currencies: Currency;

  @OneToMany(type => Photo, photos => photos.hotel, {
    nullable: false
  })
  photos: Promise<Photo[]>;

  @ManyToMany(type => PaymentMethod, paymentMethod => paymentMethod.hotels)
  paymentMethods: PaymentMethod[];

  @OneToMany(
    type => HotelBoardBasis,
    hotelBoardBasis => hotelBoardBasis.hotel,
    {
      nullable: false
    }
  )
  hotelBoardBasis: HotelBoardBasis[];

  @OneToMany(type => Room, rooms => rooms.hotel, {
    onDelete: 'RESTRICT'
  })
  rooms: Promise<Room[]>;

  @ManyToMany(
    type => BookingCondition,
    bookingConditions => bookingConditions.hotels,
    {
      onDelete: 'SET NULL',
      nullable: false
    }
  )
  bookingConditions: BookingCondition[];
}
