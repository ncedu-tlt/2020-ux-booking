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
    if (address === null) {
      return {
        country: '',
        city: '',
        street: '',
        part: '',
        number: Number()
      };
    } else {
      return {
        country: address.city.country.name,
        city: address.city.name,
        street: address.street,
        part: address.part,
        number: address.number
      };
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
    if (serviceType === null) {
      return {
        id: '',
        name: ''
      };
    } else {
      return {
        id: serviceType.id,
        name: serviceType.name
      };
    }
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
    if (photo === null) {
      return {
        id: '',
        name: '',
        src: ''
      };
    } else {
      return {
        id: photo.id,
        name: photo.name,
        src: ''
      };
    }
  }

  async getHotelById(hotel) {
    const photos = await hotel.photos;
    const distance = await hotel.distance;
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
      photos: this.convertPhotoDaoToDto(photos),
      distance: distance,
      hotelBoardBasis: hotel.hotelBoardBasis
    };
  }

  async getRoomById(room) {
    const photos = await room.photos;
    return {
      send: 'комната успешно создана',
      id: room.id,
      name: room.name,
      price: room.price,
      count: room.count,
      description: room.description,
      capacity: room.capacity,
      beds: room.beds,
      amenities: room.amenitiesRoom,
      photos: photos
    };
  }

  async createRoom(hotel, roomDto) {
    const room = new Room();
    room.name = roomDto.name;
    room.price = roomDto.price;
    room.count = roomDto.count;
    room.description = roomDto.description;
    room.capacity = roomDto.capacity;
    room.hotel = Promise.resolve(hotel);
    await this.roomRepository.manager.save(room);

    const roomFindOne = await this.roomRepository.findOne({
      name: roomDto.name,
      price: roomDto.price,
      description: roomDto.description
    });

    for (const ph of roomDto.photos) {
      const photo = new Photo();
      photo.name = ph.name;
      photo.src = ph.src;
      photo.room = Promise.resolve(roomFindOne);
      photo.hotel = Promise.resolve(hotel);
      await this.photoRepository.manager.save(photo);
    }

    for (const bed of roomDto.beds) {
      await this.bedsRepository.save({
        name: bed.name,
        rooms: [roomFindOne]
      });
    }

    for (const a of roomDto.amenities) {
      const amenities = await this.amenitiesRepository.save({
        name: a.name,
        default: a.default,
        icon: a.icon
      });

      await this.amenitiesRoomRepository.save({
        price: a.price,
        room: roomFindOne,
        amenities: amenities
      });
    }

    const newRoom = await this.roomRepository.findOne(
      { description: room.description, price: room.price, name: room.name },
      {
        relations: [
          'beds',
          'amenitiesRoom',
          'amenitiesRoom.amenities',
          'photos'
        ]
      }
    );
    const photos = await newRoom.photos;

    return {
      send: 'комната успешно создана',
      id: newRoom.id,
      name: newRoom.name,
      price: newRoom.price,
      count: newRoom.count,
      description: newRoom.description,
      capacity: newRoom.capacity,
      beds: newRoom.beds,
      amenities: newRoom.amenitiesRoom,
      photos: photos
    };
  }

  async changeRoom(roomDto, paramsId, paramsRoomId) {
    await this.roomRepository.update(paramsRoomId, {
      name: roomDto.name,
      price: roomDto.price,
      count: roomDto.count,
      description: roomDto.description,
      capacity: roomDto.capacity
    });

    const hotel = await this.hotelsRepository.findOne(paramsId);
    const room = await this.roomRepository.findOne(paramsRoomId);

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

    for (const a of roomDto.amenities) {
      if (a.id.length > 0) {
        await this.amenitiesRepository.update(a.id, {
          name: a.name,
          default: a.default,
          icon: a.icon
        });

        const amenities = await this.amenitiesRepository.findOne(a.id);

        await this.amenitiesRoomRepository.update(a.id, {
          price: a.price,
          room: room,
          amenities: amenities
        });
      } else {
        const amenities = await this.amenitiesRepository.save({
          name: a.name,
          default: a.default,
          icon: a.icon
        });

        await this.amenitiesRoomRepository.save({
          price: a.price,
          room: room,
          amenities: amenities
        });
      }
    }

    for (const p of roomDto.photos) {
      if (p.id.length > 0) {
        await this.photoRepository.update(p.id, {
          name: p.name,
          src: p.src
        });
      } else {
        const photo = new Photo();
        photo.name = p.name;
        photo.src = p.src;
        photo.room = Promise.resolve(room);
        photo.hotel = Promise.resolve(hotel);
        await this.photoRepository.manager.save(photo);
      }
    }

    const newRoom = await this.roomRepository.findOne(
      { description: room.description, price: room.price, name: room.name },
      {
        relations: [
          'beds',
          'amenitiesRoom',
          'amenitiesRoom.amenities',
          'photos'
        ]
      }
    );
    const photos = await newRoom.photos;
    return {
      send: 'комната успешно обновлена',
      id: newRoom.id,
      name: newRoom.name,
      price: newRoom.price,
      count: newRoom.count,
      description: newRoom.description,
      capacity: newRoom.capacity,
      beds: newRoom.beds,
      amenities: newRoom.amenitiesRoom,
      photos: photos
    };
  }

  async changeHotelFirstStep(hotelDto, paramsId) {
    const hotel = await this.hotelsRepository.findOne(paramsId);

    const city = await this.cityRepository.find({
      name: hotelDto.address.city
    });

    if (city.length === 0) {
      const country = await this.countryRepository.save({
        name: hotelDto.address.country
      });

      const city = await this.cityRepository.save({
        name: hotelDto.address.city,
        country: country
      });

      const address = await this.addressRepository.save({
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
        const serviceType = await this.serviceTypeRepository.findOne(
          hotelDto.serviceType.id
        );
        await this.hotelsRepository.update(paramsId, {
          serviceType: serviceType
        });
      } else {
        const serviceType = await this.serviceTypeRepository.save({
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
        const currency = await this.currencyRepository.findOne(
          hotelDto.currency.id
        );
        await this.hotelsRepository.update(paramsId, {
          currency: currency
        });
      } else {
        const currency = await this.currencyRepository.save({
          name: hotelDto.currency.name
        });
        await this.hotelsRepository.update(paramsId, {
          currency: currency
        });
      }
    } else {
      const city = await this.cityRepository.findOne({
        name: hotelDto.address.city
      });

      const address = await this.addressRepository.save({
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
        const serviceType = await this.serviceTypeRepository.findOne(
          hotelDto.serviceType.id
        );
        await this.hotelsRepository.update(paramsId, {
          serviceType: serviceType
        });
      } else {
        const serviceType = await this.serviceTypeRepository.save({
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
        const currency = await this.currencyRepository.findOne(
          hotelDto.currency.id
        );
        await this.hotelsRepository.update(paramsId, {
          currency: currency
        });
      } else {
        const currency = await this.currencyRepository.save({
          name: hotelDto.currency.name
        });
        await this.hotelsRepository.update(paramsId, {
          currency: currency
        });
      }
    }

    const updatedHotel = await this.hotelsRepository.findOne(paramsId, {
      relations: [
        'address',
        'address.city',
        'address.city.country',
        'services',
        'services.category',
        'serviceType',
        'currency'
      ]
    });
    return {
      send: 'описание дополненно',
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

  async changeHotelSecondStep(foods, paramsId) {
    const hotel = await this.hotelsRepository.findOne(paramsId);

    for (const food of foods) {
      if (food.id.length > 0) {
        await this.hotelBoardBasisRepository.update(food.id, {
          price: food.price
        });
      } else {
        const boardBasis = await this.boardBasisRepository.findOne(
          food.boardBasis.id
        ); //пока не заполнена таблица с потоянной едой ничего в последню графу приходить не будет

        await this.hotelBoardBasisRepository.save({
          hotel: hotel,
          boardBasis: boardBasis,
          price: food.price
        });
      }
    }
    const updatedHotel = await this.hotelsRepository.findOne(paramsId, {
      relations: ['hotelBoardBasis', 'hotelBoardBasis.boardBasis']
    });
    return {
      id: paramsId,
      hotelBoardBasis: updatedHotel.hotelBoardBasis,
      send: 'питание дополненно'
    };
  }

  async changeHotelThirdStep(distance, paramsId) {
    const hotel = await this.hotelsRepository.findOne(paramsId);
    const findDistance = await this.distanceRepository.findOne({
      hotel: hotel
    });

    if (distance.id.length > 0) {
      await this.distanceRepository.update(findDistance.id, {
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
    const updatedHotel = await this.hotelsRepository.findOne(paramsId, {
      relations: ['distance']
    });
    const distanceUpdate = await updatedHotel.distance;
    return {
      distance: distanceUpdate,
      send: 'расстояние дополненно'
    };
  }

  async changeHotelFourthStep(services, paramsId) {
    const hotel = await this.hotelsRepository.findOne(paramsId);

    for (const service1 of services) {
      if (service1.id.length > 0) {
        await this.serviceRepository.update(service1.id, {
          price: service1.price,
          name: service1.name,
          icon: service1.icon
        });
      } else {
        const category = await this.categoryRepository.findOne({
          name: service1.category
        });

        if (category === undefined) {
          const newCategory = await this.categoryRepository.save({
            name: service1.category
          });
          await this.serviceRepository.save({
            price: service1.price,
            name: service1.name,
            category: newCategory,
            icon: service1.icon,
            hotels: [hotel]
          });
        } else {
          await this.serviceRepository.save({
            price: service1.price,
            name: service1.name,
            category: category,
            icon: service1.icon,
            hotels: [hotel]
          });
        }
      }
    }
    const updatedHotel = await this.hotelsRepository.findOne(paramsId, {
      relations: ['services', 'services.category']
    });
    return {
      id: paramsId,
      services: this.convertServiceDaoToDto(updatedHotel.services),
      send: 'сервисы дополненно'
    };
  }

  async changeHotelFiveStep(photos, paramsId) {
    const hotel = await this.hotelsRepository.findOne(paramsId);

    for (const photo of photos.photos) {
      if (photo.id.length > 0) {
        await this.photoRepository.manager.update(Photo, photo.id, {
          name: photo.name,
          src: photo.src
        });
      } else {
        const photo1 = new Photo();
        photo1.name = photo.name;
        photo1.src = photo.src;
        photo1.hotel = Promise.resolve(hotel);
        await this.photoRepository.manager.save(photo1);
      }
    }

    if (photos.mainPhoto.id.length > 0) {
      await this.photoRepository.manager.update(Photo, photos.mainPhoto.id, {
        name: photos.mainPhoto.name,
        src: photos.mainPhoto.src
      });
    } else {
      const photo1 = new Photo();
      photo1.name = photos.mainPhoto.name;
      photo1.src = photos.mainPhoto.src;
      photo1.hotel = Promise.resolve(hotel);
      const hotelMainPhoto = await this.photoRepository.manager.save(photo1);

      await this.hotelsRepository.update(paramsId, {
        mainPhoto: hotelMainPhoto
      });
    }

    const updatedHotel = await this.hotelsRepository.findOne(paramsId, {
      relations: ['photos', 'mainPhoto']
    });
    const newPhotos = await updatedHotel.photos;
    const mainPhoto = await updatedHotel.mainPhoto;
    return {
      photos: this.convertPhotoDaoToDto(newPhotos),
      mainPhoto: mainPhoto,
      send: 'фото дополненно'
    };
  }

  /*convertAmenitiesDaoToDto(amenities: AmenitiesRoom[]): AmenitiesDto[] {
    return amenities.map(value => {
      return {
        id: value.id,
        name: value.name,
        default: value.default,
        icon: value.icon,
      } as AmenitiesDto
    })
  }*/
}
