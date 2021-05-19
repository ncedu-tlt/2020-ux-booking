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
import { Review } from './review.dao';
import { Comments } from './comment.dao';
import { ServiceType } from './service_type.dao';
import { Photo } from './photo.dao';
import { Service } from './service.dao';
import { PaymentMethod } from './payment_method.dao';
import { HotelBoardBasis } from './hotel_board_basis.dao';
import { Room } from './room.dao';
import { BookingCondition } from './booking_conditions.dao';
import { Distance } from './distance';
import { Leisure } from './leisure.dao';
import { NearbyPlaces } from './nearbyPlaces.dao';
import { Currency } from './currency.dao';

@Entity('hotels')
export class Hotel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  bookingPolicy: string;

  @Column({ nullable: true })
  stars: number;

  @Column({ type: 'decimal', nullable: true })
  minPrice: number;

  @Column({ nullable: true })
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

  @OneToMany(type => Comments, comments => comments.hotel, {
    nullable: false,
    onDelete: 'SET NULL'
  })
  comments: Promise<Comments[]>;

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

  @ManyToOne(type => Currency, car => car.hotels)
  currency: Currency;

  @ManyToOne(type => Photo, photo => photo.hotelMainPhoto)
  mainPhoto: Photo;

  @OneToMany(type => Photo, photos => photos.hotel, {
    nullable: false
  })
  photos: Promise<Photo[]>;

  @OneToMany(type => Distance, distance => distance.hotel, {
    nullable: false
  })
  distance: Promise<Distance>;

  @OneToMany(type => Leisure, leisure => leisure.hotel, {
    nullable: false
  })
  leisure: Promise<Leisure>;

  @OneToMany(type => NearbyPlaces, nearby => nearby.hotel, {
    nullable: false
  })
  nearbyPlaces: Promise<NearbyPlaces>;

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
