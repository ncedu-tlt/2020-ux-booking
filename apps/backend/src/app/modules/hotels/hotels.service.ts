import { Address } from '../db/domain/addresses.dao';
import { Injectable } from '@nestjs/common';
import { Service } from '../db/domain/service.dao';
import { ServicesDto } from '@booking/models/services.dto';
import { ServiceType } from '../db/domain/service_type.dao';
import { ServiceTypeDto } from '@booking/models/serviceType.dto';
import { Photo } from '../db/domain/photo.dao';
import { PhotosDto } from '@booking/models/photos.dto';
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
} from './hotels.constants';
import { AmenitiesDto } from '@booking/models/amenities.dto';
import { CurrencyDto } from '@booking/models/currency.dto';
import { HotelsConversionService } from './hotels-conversion.service.';

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
    private commentsRepository: Repository<Comments>,
    private hotelsConversionService: HotelsConversionService
  ) {}

  async savePhoto(newPhoto: any, hotel: Hotel, room?: Room): Promise<void> {
    const photo = new Photo();
    photo.id = newPhoto.id ?? undefined;
    photo.name = newPhoto.name;
    photo.src = newPhoto.src;
    if (room) {
      photo.room = Promise.resolve(room);
    }
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
     return this.hotelsConversionService.convertAllRoom(newRoom)
  }

  async getHotel(hotel: Hotel): Promise<HotelDto> {
    return this.hotelsConversionService.convertHotel(hotel)
  }

  async getRoom(room: Room): Promise<RoomDto> {
    return this.hotelsConversionService.convertRoom(room)
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

    for (const photo of roomDto.photos) {
      await this.savePhoto(photo, hotel, roomFindOne);
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
    await this.roomRepository.manager.save(Room, {
      id: paramsRoomId,
      name: roomDto.name,
      price: roomDto.price,
      count: roomDto.count,
      description: roomDto.description,
      capacity: roomDto.capacity
    });

    const hotel: Hotel = await this.hotelsRepository.findOne(paramsId);
    const room: Room = await this.roomRepository.findOne(paramsRoomId);

    for (const bed of roomDto.beds) {
      await this.bedsRepository.manager.save(Bed, {
        id: bed?.id ?? undefined,
        name: bed.name,
        rooms: [room]
      });
    }

    for (const amenity of roomDto.amenities) {
      const amenities: AmenitiesDto = await this.amenitiesRepository.manager.save(
        Amenities,
        {
          id: amenity?.id ?? undefined,
          name: amenity.name,
          default: amenity.default,
          icon: amenity.icon
        }
      );

      await this.amenitiesRoomRepository.manager.save(AmenitiesRoom, {
        id: amenity?.id ?? undefined,
        price: amenity.price,
        room: room,
        amenities: amenities
      });
    }

    for (const photo of roomDto.photos) {
      await this.savePhoto(photo, hotel, room);
    }

    return await this.getAllRoom(
      await this.roomRepository.findOne(paramsRoomId)
    );
  }

  async changeHotelMainInfo(
    hotelDto: HotelDto,
    paramsId: string
  ): Promise<HotelDto> {
    const hotel: Hotel = await this.hotelsRepository.findOne(paramsId);

    const serviceType: ServiceTypeDto = await this.serviceTypeRepository.manager.save(
      ServiceType,
      {
        id: hotelDto.serviceType?.id ?? undefined,
        name: hotelDto.serviceType.name
      }
    );

    const currency: CurrencyDto = await this.currencyRepository.manager.save(
      Currency,
      {
        id: hotelDto.currency?.id ?? undefined,
        name: hotelDto.currency.name
      }
    );

    await this.hotelsRepository.manager.save(Hotel, {
      id: paramsId ?? undefined,
      name: hotelDto.name,
      description: hotelDto.description,
      bookingPolicy: hotelDto.bookingPolicy,
      stars: hotelDto.stars,
      minPrice: hotelDto.minPrice,
      address: await this.addressRepository.manager.save(Address, {
        id: hotelDto.address?.id ?? undefined,
        street: hotelDto.address.street,
        number: hotelDto.address.number,
        part: hotelDto.address.part,
        city: await this.cityRepository.manager.save(City, {
          id: hotelDto.address?.cityId ?? undefined,
          name: hotelDto.address.city,
          country: await this.countryRepository.manager.save(Country, {
            id: hotelDto.address?.countryId ?? undefined,
            name: hotelDto.address.country
          })
        }),
        hotels: Promise.resolve(hotel)
      }),
      freeCancellation: hotelDto.freeCancellation,
      serviceType: serviceType,
      currency: currency
    });

    const updatedHotel: Hotel = await this.hotelsRepository.findOne(paramsId, {
      relations: RELATIONS_GET_HOTEL_ID
    });
    return this.hotelsConversionService.convertUpdatedHotel(updatedHotel)
  }

  async changeHotelFood(
    foods: HotelBoardBasisDto[],
    paramsId: string
  ): Promise<HotelDto> {
    const hotel: Hotel = await this.hotelsRepository.findOne(paramsId);

    for (const food of foods) {
      const boardBasis: BoardBasis = await this.boardBasisRepository.findOne(
        food.boardBasis.id
      ); //until the table with persistent food is filled in, nothing will come to the last column

      await this.hotelBoardBasisRepository.manager.save(HotelBoardBasis, {
        id: food?.id ?? undefined,
        price: food.price,
        hotel: hotel,
        boardBasis: boardBasis
      });
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

    await this.distanceRepository.manager.save(Distance, {
      id: distance?.id ?? undefined,
      distanceOfCenter: distance.distanceOfCenter,
      distanceOfMetro: distance.distanceOfMetro,
      distanceOfBeach: distance.distanceOfBeach,
      hotel: hotel
    });
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
      const newCategory: ServicesDto = await this.categoryRepository.manager.save(
        Categories,
        {
          id: service?.categoryId ?? undefined,
          name: service.category
        }
      );
      await this.serviceRepository.manager.save(Service, {
        price: service.price,
        name: service.name,
        category: newCategory,
        icon: service.icon,
        hotels: [hotel]
      });
    }
    const updatedHotel: Hotel = await this.hotelsRepository.findOne(paramsId, {
      relations: RELATIONS_GET_HOTEL_SERVICES
    });
    return {
      id: paramsId,
      services: this.hotelsConversionService.convertServiceDaoToDto(
        updatedHotel.services
      )
    };
  }

  async changeHotelPhotos(
    photos: PhotosDto,
    paramsId: string
  ): Promise<HotelDto> {
    const hotel: Hotel = await this.hotelsRepository.findOne(paramsId);

    for (const photo of photos.photos) {
      await this.savePhoto(photo, hotel)
    }

    const photo: Photo = new Photo();
    photo.id = photos.mainPhoto?.id ?? undefined;
    photo.name = photos.mainPhoto.name;
    photo.src = photos.mainPhoto.src;
    photo.hotel = Promise.resolve(hotel);

    await this.hotelsRepository.update(paramsId, {
      mainPhoto: await this.photoRepository.manager.save(photo)
    });

    const updatedHotel: Hotel = await this.hotelsRepository.findOne(paramsId, {
      relations: RELATIONS_GET_HOTEL_PHOTOS
    });

    return {
      photos: this.hotelsConversionService.convertPhotoDaoToDto(
        await updatedHotel.photos
      ),
      mainPhoto: await updatedHotel.mainPhoto
    };
  }
}
