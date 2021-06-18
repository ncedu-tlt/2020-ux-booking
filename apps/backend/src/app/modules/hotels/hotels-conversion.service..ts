import { Address } from '../db/domain/addresses.dao';
import { AddressDto } from '@booking/models/addressDto';
import { Injectable } from '@nestjs/common';
import { Service } from '../db/domain/service.dao';
import { ServicesDto } from '@booking/models/services.dto';
import { ServiceType } from '../db/domain/service_type.dao';
import { ServiceTypeDto } from '@booking/models/serviceType.dto';
import { Photo } from '../db/domain/photo.dao';
import { PhotosDto } from '@booking/models/photos.dto';
import { MainPhotoDto } from '@booking/models/mainPhoto.dto';
import { Hotel } from '../db/domain/hotel.dao';
import { HotelDto } from '@booking/models/hotel.dto';
import { Room } from '../db/domain/room.dao';
import { RoomDto } from '@booking/models/room.dto';

@Injectable()
export class HotelsConversionService {
  convertAddressDaoToDto(address: Address): AddressDto {
    return {
      id: address?.id ?? '',
      country: address?.city.country.name ?? '',
      countryId: address?.city.country.id ?? '',
      city: address?.city.name ?? '',
      cityId: address?.city.id ?? '',
      street: address?.street ?? '',
      part: address?.part ?? '',
      number: address?.number ?? Number()
    };
  }

  convertServiceDaoToDto(service: Service[]): ServicesDto[] {
    return service.map(value => {
      return {
        id: value.id,
        name: value.name,
        price: value.price,
        icon: value.icon,
        category: value.category.name,
        categoryId: value.category.id
      } as ServicesDto;
    });
  }

  convertServiceTypeDaoToDto(serviceType: ServiceType): ServiceTypeDto {
    return {
      id: serviceType?.id ?? '',
      name: serviceType?.name ?? ''
    };
  }

  convertPhotoDaoToDto(photos: Photo[]): PhotosDto[] {
    return photos.map(value => {
      return {
        id: value.id,
        name: value.name,
        src: value.src
      } as PhotosDto;
    });
  }

  convertMainPhotoDaoToDto(photo: Photo): MainPhotoDto {
    return {
      id: photo?.id ?? '',
      name: photo?.name ?? '',
      src: photo?.src ?? ''
    };
  }

  async convertAllRoom(newRoom: Room): Promise<RoomDto> {
    return {
      id: newRoom.id,
      name: newRoom.name,
      price: newRoom.price,
      count: newRoom.count,
      description: newRoom.description,
      capacity: newRoom.capacity,
      beds: newRoom.beds,
      amenities: newRoom.amenitiesRoom,
      photos: await newRoom.photos
    };
  }

  async convertRoom(room: Room): Promise<RoomDto> {
    return {
      id: room.id,
      name: room.name,
      price: room.price,
      count: room.count,
      description: room.description,
      capacity: room.capacity,
      beds: room.beds,
      amenities: room.amenitiesRoom,
      photos: await room.photos
    };
  }

  async convertHotel(hotel: Hotel): Promise<HotelDto> {
    return {
      id: hotel.id,
      name: hotel.name,
      description: hotel.description,
      bookingPolicy: hotel.bookingPolicy,
      stars: hotel.stars,
      minPrice: hotel.minPrice,
      freeCancellation: hotel.freeCancellation,
      services: this.convertServiceDaoToDto(
        hotel.services
      ),
      address: this.convertAddressDaoToDto(
        hotel.address
      ),
      serviceType: hotel.serviceType,
      currency: hotel.currency,
      mainPhoto: this.convertMainPhotoDaoToDto(
        hotel.mainPhoto
      ),
      photos: this.convertPhotoDaoToDto(
        await hotel.photos
      ),
      distance: await hotel.distance,
      hotelBoardBasis: hotel.hotelBoardBasis
    };
  }

  async convertUpdatedHotel(updatedHotel: Hotel): Promise<HotelDto> {
    return {
      id: updatedHotel.id,
      name: updatedHotel.name,
      description: updatedHotel.description,
      bookingPolicy: updatedHotel.bookingPolicy,
      stars: updatedHotel.stars,
      minPrice: updatedHotel.minPrice,
      address: this.convertAddressDaoToDto(
        updatedHotel.address
      ),
      freeCancellation: updatedHotel.freeCancellation,
      serviceType: this.convertServiceTypeDaoToDto(
        updatedHotel.serviceType
      ),
      currency: updatedHotel.currency
    };
  }

}
