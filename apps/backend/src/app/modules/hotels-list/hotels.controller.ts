import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Headers,
  Res,
  HttpStatus
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { Hotel } from '../db/domain/hotel.dao';
import { Country } from '../db/domain/countries.dao';
import { City } from '../db/domain/city.dao';
import { Address } from '../db/domain/addresses.dao';
import { ServiceType } from '../db/domain/service_type.dao';
import { Service } from '../db/domain/service.dao';
import { Photo } from '../db/domain/photo.dao';
import { Categories } from '../db/domain/categories.dao';
import { Currency } from '../db/domain/currency.dao';
import { Distance } from '../db/domain/distance';
import { BoardBasis } from '../db/domain/board_basis.dao';
import { HotelBoardBasis } from '../db/domain/hotel_board_basis.dao';
import { Room } from '../db/domain/room.dao';
import { Amenities } from '../db/domain/ameniries.dao';
import { AmenitiesRoom } from '../db/domain/amenities_room.dao';
import { Bed } from '../db/domain/bed.dao';
import { Review } from '../db/domain/review.dao';
import { Comments } from '../db/domain/comment.dao';
import { HotelDto } from '@booking/models/hotel.dto';
import { Response } from 'express';
import { HotelBoardBasisDto } from '@booking/models/hotelBoardBasis.dto';
import { DistanceDto } from '@booking/models/distance.dto';
import { ServicesDto } from '@booking/models/services.dto';
import { RoomDto } from '@booking/models/room.dto';
import { PhotosDto } from '@booking/models/photos.dto';
import { HotelsConversionService } from './hotels-conversion.service';

@Controller('/hotels')
export class HotelsController {
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

    private hotelsService: HotelsConversionService
  ) {}

  @Get(':id')
  async getHotelById(@Param() params): Promise<HotelDto> {
    const hotel = await this.hotelsRepository.findOne(params.id, {
      relations: [
        'address',
        'address.city',
        'address.city.country',
        'services',
        'services.category',
        'serviceType',
        'currency',
        'mainPhoto',
        'photos',
        'distance',
        'hotelBoardBasis',
        'hotelBoardBasis.boardBasis'
      ]
    });
    const hotels = await getRepository(Hotel).findOne(hotel.id);
    const photos = await hotels.photos;
    const distance = await hotels.distance;

    return {
      id: hotel.id,
      name: hotel.name,
      description: hotel.description,
      bookingPolicy: hotel.bookingPolicy,
      stars: hotel.stars,
      minPrice: hotel.minPrice,
      freeCancellation: hotel.freeCancellation,
      services: this.hotelsService.convertServiceDaoToDto(hotel.services),
      address: this.hotelsService.convertAddressDaoToDto(hotel.address),
      serviceType: hotel.serviceType,
      currency: hotel.currency,
      mainPhoto: this.hotelsService.convertMainPhotoDaoToDto(hotel.mainPhoto),
      photos: this.hotelsService.convertPhotoDaoToDto(photos),
      distance: distance,
      hotelBoardBasis: hotel.hotelBoardBasis
    };
  }

  @Get()
  async getHotels(
    @Headers('range') range: number,
    @Res() res: Response
  ): Promise<void> {
    const hotels = await this.hotelsRepository
      .find({ relations: ['address', 'address.city', 'address.city.country'], skip: range, take: 10 })
      .then((value) => {
        res.status(HttpStatus.OK).send(
          value.map(m => ({
            id: m.id,
            name: m.name,
            address: m.address
          })))
      })
      .catch(error => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        return error;
      });
    res.send(hotels)
  }

  @Get(':id/rooms/:roomId')
  async getRoom(@Param() params): Promise<RoomDto> {
    const room = await this.roomRepository.findOne(params.roomId, {
      relations: ['beds', 'amenitiesRoom', 'amenitiesRoom.amenities', 'photos']})
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

  @Get(':id/rooms')
  async getRooms(
    @Param() params,
    @Headers('range') range: number,
    @Res() res: Response
  ): Promise<void> {
    const rooms = await this.roomRepository.find({
      relations: ['beds'],
      where: {
        hotel: params.id
      },
      skip: range,
      take: 10,
    })
      .then((value) => {
        res.status(HttpStatus.OK).send(
          value.map(m => ({
            id: m.id,
            name: m.name,
            capacity: m.capacity,
            beds: m.beds,
            price: m.price
          })))
      })
      .catch(error => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        return error;
      });
    res.send(rooms)
  }

  @Post(':id/rooms')
  async createRoom(
    @Param() params,
    @Body() roomDto: RoomDto
  ): Promise<RoomDto> {
    const hotel = await this.hotelsRepository.findOne(params.id);

    const room = new Room();
    room.name = roomDto.name;
    room.price = roomDto.price;
    room.count = roomDto.count;
    room.description = roomDto.description;
    room.capacity = roomDto.capacity;
    room.hotel = Promise.resolve(hotel);
    await this.roomRepository.manager.save(room);

    const room1 = await this.roomRepository.findOne({
      name: roomDto.name,
      price: roomDto.price,
      description: roomDto.description
    });

    for (const photo of roomDto.photos) {
      const photo1 = new Photo();
      photo1.name = photo.name;
      photo1.src = photo.src;
      photo1.room = Promise.resolve(room1);
      photo1.hotel = Promise.resolve(hotel);
      await this.photoRepository.manager.save(photo1);
    }

    for (let bed of roomDto.beds) {
      await this.bedsRepository.save({
        name: bed.name,
        rooms: [room1]
      });
    }

    for (const a of roomDto.amenities) {
      const amenities = await this.amenitiesRepository.save({
        name: a.name,
        default: a.default,
        icon: a.icon,
      });

      await this.amenitiesRoomRepository.save({
        price: a.price,
        room: room1,
        amenities: amenities
      });
    }

    const newRoom = await this.roomRepository.findOne({description: room.description, price: room.price, name: room.name}, {relations: ['beds', 'amenitiesRoom', 'amenitiesRoom.amenities', 'photos']})
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

  @Patch(':id/rooms/:roomId')
  async changeRoom(
    @Param() params,
    @Body() roomDto: RoomDto
  ): Promise<RoomDto> {
    await this.roomRepository.update(params.roomId, {
      name: roomDto.name,
      price: roomDto.price,
      count: roomDto.count,
      description: roomDto.description,
      capacity: roomDto.capacity
    });

    const hotel = await this.hotelsRepository.findOne(params.id);
    const room = await this.roomRepository.findOne(params.roomId);


    for (let bed of roomDto.beds) {
      if (bed.id.length > 0) {
        await this.bedsRepository.update(bed.id, {
          name: bed.name
        })
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

    const newRoom = await this.roomRepository.findOne({description: room.description, price: room.price, name: room.name}, {relations: ['beds', 'amenitiesRoom', 'amenitiesRoom.amenities', 'photos']})
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
  @Delete(':id/room/:roomId/:amenitiesId')
  async deleteAmenities(@Param() params): Promise<RoomDto> {
    const amenities = await this.amenitiesRepository.findOne({
      id: params.amenitiesId
    });
    await this.serviceRepository.delete(amenities);

    const amenitiesRoom = await this.amenitiesRoomRepository.findOne({
      id: params.amenitiesId
    });
    await this.serviceRepository.delete(amenitiesRoom);
    const newRoom = await this.roomRepository.findOne(params.roomId, {relations: ['beds', 'amenitiesRoom', 'amenitiesRoom.amenities', 'photos']})
    return {
      send: 'комната обновлена',
      amenities: newRoom.amenitiesRoom
    };
  }

  @Delete(':id/room/:roomId/:photoId')
  async deletePhotoRoom(@Param() params): Promise<RoomDto> {
    const photo = await this.photoRepository.findOne({ id: params.photo.id });
    await this.photoRepository.delete(photo);

    const newRoom = await this.roomRepository.findOne(params.roomId, { relations: ['photos'] })
    const photos = await newRoom.photos;
    return {
      send: `photo room delete`,
      photos: photos
    };
  }

  @Post()
  async addHotel(
    @Body()
      body: {
      name: string;
    }
  ): Promise<any> {
    const hotel = await this.hotelsRepository.save({
      name: body.name
    });

    return {
      send: 'done',
      id: hotel.id
    };
  }

  @Patch(':id/1')
  async changeHotelFirstStep(
    @Param() params,
    @Body() hotelDto: HotelDto
  ): Promise<HotelDto> {
    const hotel = await this.hotelsRepository.findOne(params.id);

    const city = await this.cityRepository.find({ name: hotelDto.address.city });

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

      await this.hotelsRepository.update(params.id, {
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
        const serviceType = await this.serviceTypeRepository.findOne(hotelDto.serviceType.id)
        await this.hotelsRepository.update(params.id, {
          serviceType: serviceType
        });
      } else {
        const serviceType = await this.serviceTypeRepository.save({
          name: hotelDto.serviceType.name
        });
        await this.hotelsRepository.update(params.id, {
          serviceType: serviceType
        });
      }


      if (hotelDto.currency.id.length > 0 ) {
        await this.currencyRepository.update(hotelDto.currency.id, {
          name: hotelDto.currency.name
        })
        const currency = await this.currencyRepository.findOne(hotelDto.currency.id)
        await this.hotelsRepository.update(params.id, {
          currency: currency
        });
      } else {
        const currency = await this.currencyRepository.save({
          name: hotelDto.currency.name
        });
        await this.hotelsRepository.update(params.id, {
          currency: currency
        });
      }

    } else {
      const city = await this.cityRepository.findOne({ name: hotelDto.address.city });

      const address = await this.addressRepository.save({
        street: hotelDto.address.street,
        number: hotelDto.address.number,
        part: hotelDto.address.part,
        city: city,
        hotels: Promise.resolve(hotel)
      });



      await this.hotelsRepository.update(params.id, {
        name: hotelDto.name,
        description: hotelDto.description,
        bookingPolicy: hotelDto.bookingPolicy,
        stars: hotelDto.stars,
        minPrice: hotelDto.minPrice,
        address: address,
        freeCancellation: hotelDto.freeCancellation,
      });

      if (hotelDto.serviceType.id.length > 0) {
        await this.serviceTypeRepository.update(hotelDto.serviceType.id, {
          name: hotelDto.serviceType.name
        });
        const serviceType = await this.serviceTypeRepository.findOne(hotelDto.serviceType.id)
        await this.hotelsRepository.update(params.id, {
          serviceType: serviceType
        });
      } else {
        const serviceType = await this.serviceTypeRepository.save({
          name: hotelDto.serviceType.name
        });
        await this.hotelsRepository.update(params.id, {
          serviceType: serviceType
        });
      }

      if (hotelDto.currency.id.length > 0 ) {
        await this.currencyRepository.update(hotelDto.currency.id, {
          name: hotelDto.currency.name
        })
        const currency = await this.currencyRepository.findOne(hotelDto.currency.id)
        await this.hotelsRepository.update(params.id, {
          currency: currency
        });
      } else {
        const currency = await this.currencyRepository.save({
          name: hotelDto.currency.name
        });
        await this.hotelsRepository.update(params.id, {
          currency: currency
        });
      }
    }

    const updatedHotel = await this.hotelsRepository.findOne(params.id, {
      relations: [
        'address',
        'address.city',
        'address.city.country',
        'services',
        'services.category',
        'serviceType',
        'currency',
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
      address: this.hotelsService.convertAddressDaoToDto(updatedHotel.address),
      freeCancellation: updatedHotel.freeCancellation,
      serviceType: this.hotelsService.convertServiceTypeDaoToDto(updatedHotel.serviceType),
      currency: updatedHotel.currency
    };

  }

  @Patch(':id/2')
  async changeHotelSecondStep(
    @Param() params,
    @Body() foods: HotelBoardBasisDto[]
  ): Promise<HotelDto> {
    const hotel = await this.hotelsRepository.findOne(params.id);

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
    const updatedHotel = await this.hotelsRepository.findOne(params.id, {
      relations: [
        'hotelBoardBasis',
        'hotelBoardBasis.boardBasis'
      ]
    });
    return {
      id: params.id,
      hotelBoardBasis: updatedHotel.hotelBoardBasis,
      send: 'питание дополненно'
    };
  }

  @Delete(':id/2/:foodId')
  async deleteFood(@Param() params): Promise<any> {
    const food = await this.hotelBoardBasisRepository.findOne({
      hotel: params.id,
      boardBasis: params.foodId
    });
    await this.hotelBoardBasisRepository.delete(food);
    const updatedHotel = await this.hotelsRepository.findOne(params.id, {
      relations: [
        'hotelBoardBasis',
        'hotelBoardBasis.boardBasis'
      ]
    });
    return {
      hotelBoardBasis: updatedHotel.hotelBoardBasis,
      send: `food delete`
    };
  }

  @Patch(':id/3')
  async changeHotelThirdStep(
    @Param() params,
    @Body() distance: DistanceDto
  ): Promise<HotelDto> {
    const hotel = await this.hotelsRepository.findOne(params.id);
    const findDistance = await this.distanceRepository.findOne({hotel: hotel})

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
    const updatedHotel = await this.hotelsRepository.findOne(params.id, {
      relations: [
        'distance'
      ]
    });
    const distanceUpdate = await updatedHotel.distance
    return {
      distance: distanceUpdate,
      send: 'расстояние дополненно'
    };
  }

  @Patch(':id/4')
  async changeHotelFourthStep(
    @Param() params,
    @Body() services: ServicesDto[]

  ): Promise<HotelDto> {
    const hotel = await this.hotelsRepository.findOne(params.id);

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

        if(category === undefined){
         const newCategory = await this.categoryRepository.save({
           name: service1.category
         })
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
    const updatedHotel = await this.hotelsRepository.findOne(params.id, {
      relations: [
        'services',
        'services.category'
      ]})
    return {
      id: params.id,
      services: this.hotelsService.convertServiceDaoToDto(updatedHotel.services),
      send: 'сервисы дополненно'
    };
  }

  @Delete(':id/4/:serviceId')
  async deleteService(@Param() params): Promise<HotelDto> {
    const service = await this.serviceRepository.findOne({
      id: params.serviceId
    });
    await this.serviceRepository.remove(service);

    const updatedHotel = await this.hotelsRepository.findOne(params.id, {
      relations: [
        'services',
        'services.category'
      ]})

    return {
      services: this.hotelsService.convertServiceDaoToDto(updatedHotel.services),
      send: `service delete`
    };
  }



  @Patch(':id/5')
  async changeHotelFiveStep(
    @Param() params,
    @Body() photos: PhotosDto
  ): Promise<HotelDto> {
    const hotel = await this.hotelsRepository.findOne(params.id);

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

        await this.hotelsRepository.update(params.id, {
          mainPhoto: hotelMainPhoto
        })
      }


    const updatedHotel = await this.hotelsRepository.findOne(params.id, {
      relations: [
        'photos',
        'mainPhoto'
      ]})
    const newPhotos = await updatedHotel.photos;
    const mainPhoto = await updatedHotel.mainPhoto
    return {
      photos: this.hotelsService.convertPhotoDaoToDto(newPhotos),
      mainPhoto: mainPhoto,
      send: 'фото дополненно'
    };
  }

  @Delete(':id/5:photoId')
  async deletePhotoHotel(@Param() params): Promise<HotelDto> {
    const photo = await this.photoRepository.findOne({ id: params.photo.id });
    await this.photoRepository.delete(photo);

    const updatedHotel = await this.hotelsRepository.findOne(params.id, {
      relations: [
        'photos',
        'mainPhoto'
      ]})
    const newPhotos = await updatedHotel.photos;
    const mainPhoto = await updatedHotel.mainPhoto
    return {
      photos: this.hotelsService.convertPhotoDaoToDto(newPhotos),
      mainPhoto: mainPhoto,
      send: 'photo delete'
    };
  }


  @Delete(':id')
  async deleteHotel(@Param() params): Promise<HotelDto> {
    await this.hotelsRepository.delete(params.id);
    const hotelDelete = await this.hotelsRepository.findOne(params.id)

    return {
      send: `hotel delete`,
      id: hotelDelete.id,
      name: hotelDelete.name
    };
  }

  @Delete(':id/rooms/:roomId')
  async deleteRoom(@Param() params): Promise<any> {
    await this.roomRepository.delete(params.roomId);

    return {
      send: 'комната удалена'
    };
  }

  /*@Patch(':id/6')
  async changeHotelSixStep(
    @Param('id') id: string,
    @Body()
    body: {
      comments: {
        id: string;
        text: string;
      }[];
    }
  ): Promise<any> {
    const hotel = await this.hotelsRepository.findOne({ id });
    for (const com of body.comments) {
      /!*await this.commentsRepository.save({
        text: com.text,
        hotel: hotel
      });*!/

      if (com.id.length > 0) {

      }

      const comments = new Comments();
      comments.text = com.text
      comments.hotel = Promise.resolve(hotel)
      await this.commentsRepository.manager.save(comments);
    }

    return {
      id: id,
      send: 'комментарии дополненно'
    };
  }

  @Patch(':id/7')
  async changeHotelSevenStep(
    @Param('id') id: string,
    @Body()
    body: {
      review: {
        text: string;
        pros: string;
        cons: string;
        rating: number;
      }[];
    }
  ): Promise<any> {
    const hotel = await this.hotelsRepository.findOne({ id });
    for (const rev of body.review) {
      await this.commentsRepository.save({
        text: rev.text,
        pros: rev.pros,
        cons: rev.cons,
        rating: rev.rating
      });
    }

    return {
      id: id,
      send: 'отзывы дополненно'
    };
  }*/


}
