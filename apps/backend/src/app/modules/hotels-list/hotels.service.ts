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
import { Amenities } from '../db/domain/ameniries.dao';
import { AmenitiesRoom } from '../db/domain/amenities_room.dao';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from '../db/domain/hotel.dao';
import { Repository } from 'typeorm';
import { Country } from '../db/domain/countries.dao';
import { City } from '../db/domain/city.dao';
import { Categories } from '../db/domain/categories.dao';
import { Currency } from '../db/domain/currency.dao';
import { Distance } from '../db/domain/distance';
import { BoardBasis } from '../db/domain/board_basis.dao';
import { HotelBoardBasis } from '../db/domain/hotel_board_basis.dao';
import { Room } from '../db/domain/room.dao';
import { Bed } from '../db/domain/bed.dao';
import { Review } from '../db/domain/review.dao';
import { Comments } from '../db/domain/comment.dao';
import { HotelDto } from '@booking/models/hotel.dto';
import { RoomDto } from '@booking/models/room.dto';
import { HotelBoardBasisDto } from '@booking/models/hotelBoardBasis.dto';
import { DistanceDto } from '@booking/models/distance.dto';
import {
  RELATIONS_GET_HOTEL_FOOD,
  RELATIONS_GET_HOTEL_ID,
  RELATIONS_GET_HOTEL_PHOTOS,
  RELATIONS_GET_HOTEL_SERVICES,
  RELATIONS_GET_ROOM
} from './hotel.constants';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private hotelsRepository: Repository<Hotel>,
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @InjectRepository(ServiceType)
    private serviceTypeRepository: Repository<ServiceType>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
    @InjectRepository(Categories)
    private categoryRepository: Repository<Categories>,
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
    @InjectRepository(Distance)
    private distanceRepository: Repository<Distance>,
    @InjectRepository(BoardBasis)
    private boardBasisRepository: Repository<BoardBasis>,
    @InjectRepository(HotelBoardBasis)
    private hotelBoardBasisRepository: Repository<HotelBoardBasis>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(Amenities)
    private amenitiesRepository: Repository<Amenities>,
    @InjectRepository(AmenitiesRoom)
    private amenitiesRoomRepository: Repository<AmenitiesRoom>,
    @InjectRepository(Bed)
    private bedsRepository: Repository<Bed>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Comments)
    private commentsRepository: Repository<Comments>
  ) {}
  convertAddressDaoToDto(address: Address): AddressDto {
    return {
      country: address?.city.country.name ?? '',
      city: address?.city.name ?? '',
      street: address?.street ?? '',
      part: address?.part ?? '',
      number: address?.number ?? Number()
    }

  }

  convertServiceDaoToDto(service: Service[]): ServicesDto[] {
    return service.map(value => {
      return {
        id: value.id,
        name: value.name,
        price: value.price,
        icon: value.icon,
        category: value.category.name
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

  async photoRoomSave(photoRoom, room, hotel): Promise<void> {
    const photo = new Photo();
    photo.name = photoRoom.name;
    photo.src = photoRoom.src;
    photo.room = Promise.resolve(room);
    photo.hotel = Promise.resolve(hotel);
    await this.photoRepository.manager.save(photo);
  }

  async getAllRoom(room: Room): Promise<RoomDto> {
    const newRoom: Room = await this.roomRepository.findOne(
      { description: room.description, price: room.price, name: room.name },
      {
        relations: RELATIONS_GET_ROOM
      }
    );
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

  async getHotel(hotel: Hotel): Promise<HotelDto> {
    return {
      id: hotel.id,
      name: hotel.name,
      description: hotel.description,
      bookingPolicy: hotel.bookingPolicy,
      stars: hotel.stars,
      minPrice: hotel.minPrice,
      freeCancellation: hotel.freeCancellation,
      services: this.convertServiceDaoToDto(hotel.services),
      address: this.convertAddressDaoToDto(hotel.address),
      serviceType: hotel.serviceType,
      currency: hotel.currency,
      mainPhoto: this.convertMainPhotoDaoToDto(hotel.mainPhoto),
      photos: this.convertPhotoDaoToDto(await hotel.photos),
      distance: await hotel.distance,
      hotelBoardBasis: hotel.hotelBoardBasis
    };
  }

  async saveMainInfoHotel(
    hotelDto: HotelDto,
    paramsId: string,
    city: City,
    hotel: Hotel
  ): Promise<void> {
    const address: Address = await this.addressRepository.save({
      street: hotelDto.address.street,
      number: hotelDto.address.number,
      part: hotelDto.address.part,
      city: city,
      hotels: Promise.resolve(hotel)
    });

    await this.hotelsRepository.update(paramsId, {
      name: hotelDto.name,
      description: hotelDto.description,
      bookingPolicy: hotelDto.bookingPolicy,
      stars: hotelDto.stars,
      minPrice: hotelDto.minPrice,
      address: address,
      freeCancellation: hotelDto.freeCancellation
    });

    if (hotelDto.serviceType.id.length > 0) {
      await this.serviceTypeRepository.update(hotelDto.serviceType.id, {
        name: hotelDto.serviceType.name
      });
      const serviceType: ServiceType = await this.serviceTypeRepository.findOne(
        hotelDto.serviceType.id
      );
      await this.hotelsRepository.update(paramsId, {
        serviceType: serviceType
      });
    } else {
      const serviceType: ServiceType = await this.serviceTypeRepository.save({
        name: hotelDto.serviceType.name
      });
      await this.hotelsRepository.update(paramsId, {
        serviceType: serviceType
      });
    }

    if (hotelDto.currency.id.length > 0) {
      await this.currencyRepository.update(hotelDto.currency.id, {
        name: hotelDto.currency.name
      });
      const currency: Currency = await this.currencyRepository.findOne(
        hotelDto.currency.id
      );
      await this.hotelsRepository.update(paramsId, {
        currency: currency
      });
    } else {
      const currency: Currency = await this.currencyRepository.save({
        name: hotelDto.currency.name
      });
      await this.hotelsRepository.update(paramsId, {
        currency: currency
      });
    }
  }

  async getRoom(room: Room): Promise<RoomDto> {
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

  async createRoom(hotel: Hotel, roomDto: RoomDto): Promise<RoomDto> {
    const room: Room = new Room();
    room.name = roomDto.name;
    room.price = roomDto.price;
    room.count = roomDto.count;
    room.description = roomDto.description;
    room.capacity = roomDto.capacity;
    room.hotel = Promise.resolve(hotel);
    await this.roomRepository.manager.save(room);

    const roomFindOne: Room = await this.roomRepository.findOne({
      name: roomDto.name,
      price: roomDto.price,
      description: roomDto.description
    });

    for (const ph of roomDto.photos) {
      await this.photoRoomSave(ph, roomFindOne, hotel);
    }

    for (const bed of roomDto.beds) {
      await this.bedsRepository.save({
        name: bed.name,
        rooms: [roomFindOne]
      });
    }

    for (const amenity of roomDto.amenities) {
      const amenities: Amenities = await this.amenitiesRepository.save({
        name: amenity.name,
        default: amenity.default,
        icon: amenity.icon
      });

      await this.amenitiesRoomRepository.save({
        price: amenity.price,
        room: roomFindOne,
        amenities: amenities
      });
    }

    return await this.getAllRoom(room);
  }

  async changeRoom(
    roomDto: RoomDto,
    paramsId: string,
    paramsRoomId: string
  ): Promise<RoomDto> {
    await this.roomRepository.update(paramsRoomId, {
      name: roomDto.name,
      price: roomDto.price,
      count: roomDto.count,
      description: roomDto.description,
      capacity: roomDto.capacity
    });

    const hotel: Hotel = await this.hotelsRepository.findOne(paramsId);
    const room: Room = await this.roomRepository.findOne(paramsRoomId);

    for (const bed of roomDto.beds) {
      if (bed.id.length > 0) {
        await this.bedsRepository.update(bed.id, {
          name: bed.name
        });
      } else {
        await this.bedsRepository.save({
          name: bed.name,
          rooms: [room]
        });
      }
    }

    for (const amenity of roomDto.amenities) {
      if (amenity.id.length > 0) {
        await this.amenitiesRepository.update(amenity.id, {
          name: amenity.name,
          default: amenity.default,
          icon: amenity.icon
        });

        const amenities: Amenities = await this.amenitiesRepository.findOne(
          amenity.id
        );

        await this.amenitiesRoomRepository.update(amenity.id, {
          price: amenity.price,
          room: room,
          amenities: amenities
        });
      } else {
        const amenities: Amenities = await this.amenitiesRepository.save({
          name: amenity.name,
          default: amenity.default,
          icon: amenity.icon
        });

        await this.amenitiesRoomRepository.save({
          price: amenity.price,
          room: room,
          amenities: amenities
        });
      }
    }

    for (const photo of roomDto.photos) {
      if (photo.id.length > 0) {
        await this.photoRepository.update(photo.id, {
          name: photo.name,
          src: photo.src
        });
      } else {
        await this.photoRoomSave(photo, room, hotel);
      }
    }

    return await this.getAllRoom(room);
  }

  async changeHotelMainInfo(
    hotelDto: HotelDto,
    paramsId: string
  ): Promise<HotelDto> {
    const hotel: Hotel = await this.hotelsRepository.findOne(paramsId);

    const city: City[] = await this.cityRepository.find({
      name: hotelDto.address.city
    });

    if (city.length === 0) {
      const country: Country = await this.countryRepository.save({
        name: hotelDto.address.country
      });

      const city: City = await this.cityRepository.save({
        name: hotelDto.address.city,
        country: country
      });

      await this.saveMainInfoHotel(hotelDto, paramsId, city, hotel);
    } else {
      const city: City = await this.cityRepository.findOne({
        name: hotelDto.address.city
      });

      await this.saveMainInfoHotel(hotelDto, paramsId, city, hotel);
    }

    const updatedHotel: Hotel = await this.hotelsRepository.findOne(paramsId, {
      relations: RELATIONS_GET_HOTEL_ID
    });
    return {
      id: updatedHotel.id,
      name: updatedHotel.name,
      description: updatedHotel.description,
      bookingPolicy: updatedHotel.bookingPolicy,
      stars: updatedHotel.stars,
      minPrice: updatedHotel.minPrice,
      address: this.convertAddressDaoToDto(updatedHotel.address),
      freeCancellation: updatedHotel.freeCancellation,
      serviceType: this.convertServiceTypeDaoToDto(updatedHotel.serviceType),
      currency: updatedHotel.currency
    };
  }

  async changeHotelFood(
    foods: HotelBoardBasisDto[],
    paramsId: string
  ): Promise<HotelDto> {
    const hotel: Hotel = await this.hotelsRepository.findOne(paramsId);

    for (const food of foods) {
      if (food.id.length > 0) {
        await this.hotelBoardBasisRepository.update(food.id, {
          price: food.price
        });
      } else {
        const boardBasis: BoardBasis = await this.boardBasisRepository.findOne(
          food.boardBasis.id
        ); //пока не заполнена таблица с потоянной едой ничего в последню графу приходить не будет

        await this.hotelBoardBasisRepository.save({
          hotel: hotel,
          boardBasis: boardBasis,
          price: food.price
        });
      }
    }
    const updatedHotel: Hotel = await this.hotelsRepository.findOne(paramsId, {
      relations: RELATIONS_GET_HOTEL_FOOD
    });
    return {
      id: paramsId,
      hotelBoardBasis: updatedHotel.hotelBoardBasis
    };
  }

  async changeHotelDistance(
    distance: DistanceDto,
    paramsId: string
  ): Promise<HotelDto> {
    const hotel: Hotel = await this.hotelsRepository.findOne(paramsId);
    const hotelDistance: Distance = await this.distanceRepository.findOne({
      hotel: hotel
    });

    if (distance.id.length > 0) {
      await this.distanceRepository.update(hotelDistance.id, {
        distanceOfCenter: distance.distanceOfCenter,
        distanceOfMetro: distance.distanceOfMetro,
        distanceOfBeach: distance.distanceOfBeach
      });
    } else {
      await this.distanceRepository.save({
        distanceOfCenter: distance.distanceOfCenter,
        distanceOfMetro: distance.distanceOfMetro,
        distanceOfBeach: distance.distanceOfBeach,
        hotel: hotel
      });
    }
    const updatedHotel: Hotel = await this.hotelsRepository.findOne(paramsId, {
      relations: RELATIONS_GET_HOTEL_ID
    });
    const distanceUpdated: Distance = await updatedHotel.distance;
    return {
      distance: distanceUpdated
    };
  }

  async changeHotelServices(
    services: ServicesDto[],
    paramsId: string
  ): Promise<HotelDto> {
    const hotel: Hotel = await this.hotelsRepository.findOne(paramsId);

    for (const service of services) {
      if (service.id.length > 0) {
        await this.serviceRepository.update(service.id, {
          price: service.price,
          name: service.name,
          icon: service.icon
        });
      } else {
        const category: Categories = await this.categoryRepository.findOne({
          name: service.category
        });

        if (category === undefined) {
          const newCategory: Categories = await this.categoryRepository.save({
            name: service.category
          });
          await this.serviceRepository.save({
            price: service.price,
            name: service.name,
            category: newCategory,
            icon: service.icon,
            hotels: [hotel]
          });
        } else {
          await this.serviceRepository.save({
            price: service.price,
            name: service.name,
            category: category,
            icon: service.icon,
            hotels: [hotel]
          });
        }
      }
    }
    const updatedHotel: Hotel = await this.hotelsRepository.findOne(paramsId, {
      relations: RELATIONS_GET_HOTEL_SERVICES
    });
    return {
      id: paramsId,
      services: this.convertServiceDaoToDto(updatedHotel.services)
    };
  }

  async changeHotelPhotos(
    photos: PhotosDto,
    paramsId: string
  ): Promise<HotelDto> {
    const hotel: Hotel = await this.hotelsRepository.findOne(paramsId);

    for (const photo of photos.photos) {
      if (photo.id.length > 0) {
        await this.photoRepository.manager.update(Photo, photo.id, {
          name: photo.name,
          src: photo.src
        });
      } else {
        const photos: Photo = new Photo();
        photos.name = photo.name;
        photos.src = photo.src;
        photos.hotel = Promise.resolve(hotel);
        await this.photoRepository.manager.save(photos);
      }
    }

    if (photos.mainPhoto.id.length > 0) {
      await this.photoRepository.manager.update(Photo, photos.mainPhoto.id, {
        name: photos.mainPhoto.name,
        src: photos.mainPhoto.src
      });
    } else {
      const photo: Photo = new Photo();
      photo.name = photos.mainPhoto.name;
      photo.src = photos.mainPhoto.src;
      photo.hotel = Promise.resolve(hotel);
      const hotelMainPhoto = await this.photoRepository.manager.save(photo);

      await this.hotelsRepository.update(paramsId, {
        mainPhoto: hotelMainPhoto
      });
    }

    const updatedHotel: Hotel = await this.hotelsRepository.findOne(paramsId, {
      relations: RELATIONS_GET_HOTEL_PHOTOS
    });

    return {
      photos: this.convertPhotoDaoToDto(await updatedHotel.photos),
      mainPhoto: await updatedHotel.mainPhoto
    };
  }
}
