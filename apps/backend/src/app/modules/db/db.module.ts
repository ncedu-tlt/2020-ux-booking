import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './domain/addresses.dao';
import { City } from './domain/city.dao';
import { Country } from './domain/countries.dao';
import { MessageDao } from './domain/message.dao';
import { User } from './domain/user.dao';
import { Role } from './domain/role.dao';
import { Hotel } from './domain/hotel.dao';
import { Review } from './domain/review.dao';
import { Comments } from './domain/comment.dao';
import { Photo } from './domain/photo.dao';
import { ServiceType } from './domain/service_type.dao';
import { Service } from './domain/service.dao';
import { PaymentMethod } from './domain/payment_method.dao';
import { HotelBoardBasis } from './domain/hotel_board_basis.dao';
import { BoardBasis } from './domain/board_basis.dao';
import { BookingDetail } from './domain/booking_detail.dao';
import { BookingCondition } from './domain/booking_conditions.dao';
import { Booking } from './domain/booking.dao';
import { Bed } from './domain/bed.dao';
import { Room } from './domain/room.dao';
import { Amenities } from './domain/ameniries.dao';
import { AmenitiesRoom } from './domain/amenities_room.dao';
import { Categories } from './domain/categories.dao';
import { Distance } from './domain/distance';
import { Currency } from './domain/currency.dao';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Address,
      Amenities,
      AmenitiesRoom,
      Bed,
      BoardBasis,
      Booking,
      BookingCondition,
      BookingDetail,
      City,
      Comments,
      Country,
      HotelBoardBasis,
      Hotel,
      PaymentMethod,
      Photo,
      Review,
      Role,
      Room,
      ServiceType,
      Service,
      User,
      MessageDao,
      Categories,
      Distance,
      Currency
    ])
  ],
  exports: [TypeOrmModule]
})
export class DbModule {}
