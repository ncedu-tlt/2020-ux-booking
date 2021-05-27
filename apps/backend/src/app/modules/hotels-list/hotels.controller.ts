import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Headers,
  Response,
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
import { HotelModel } from '@booking/models/hotel.model';
import { Response as ResponseType } from 'express';

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
    private commentsRepository: Repository<Comments>
  ) {}

  @Get(':id')
  async getHotelById(@Param() params): Promise<HotelModel> {
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
      services: hotel.services,
      address: hotel.address,
      serviceType: hotel.serviceType,
      currency: hotel.currency,
      mainPhoto: hotel.mainPhoto,
      photos: photos,
      distance: distance,
      hotelBoardBasis: hotel.hotelBoardBasis
    };
  }

  @Get()
  async getHotels(
    @Headers('range') range: number,
    @Response() res: ResponseType
  ): Promise<any> {
    const hotel = await this.hotelsRepository.find({
      relations: ['address', 'address.city', 'address.city.country'],
      skip: range,
      take: 10
    });
    res.set('range', range + '-' + (Number(range) + hotel.length));
    return res.status(HttpStatus.OK).send(
      hotel.map(m => ({
        id: m.id,
        name: m.name,
        address: m.address
      }))
    );

    /*return hotel.map(m => ({
      id: m.id,
      name: m.name,
      address: m.address
    }))*/
  }

  @Get(':id/rooms/:roomId')
  async getRoom(@Param() params): Promise<any> {
    return await this.roomRepository.findByIds([params.roomId], {
      relations: ['beds']
    });
  }

  @Get('/rooms')
  async getRooms(): Promise<any> {
    return await this.roomRepository.find();
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
    @Body()
    body: {
      name: string;
      description: string;
      country: string;
      city: string;
      street: string;
      part: string;
      numberOnStreet: number;
      bookingPolicy: string;
      stars: number;
      minPrice: number;
      freeCancellation: boolean;
      serviceType: string;
      currency: string;
    }
  ): Promise<any> {
    const hotel = await this.hotelsRepository.findOne(params.id);

    const city = await this.cityRepository.findOne({ name: body.city });

    if (city.name.length === 0) {
      const country = await this.countryRepository.save({
        name: body.country
      });

      const city = await this.cityRepository.save({
        name: body.city,
        country: country
      });

      const address = await this.addressRepository.save({
        street: body.street,
        number: body.numberOnStreet,
        part: body.part,
        city: city,
        hotels: Promise.resolve(hotel)
      });

      const serviceType = await this.serviceTypeRepository.save({
        name: body.serviceType
      });

      const currency = await this.currencyRepository.save({
        name: body.currency
      });

      await this.hotelsRepository.update(params.id, {
        name: body.name,
        description: body.description,
        bookingPolicy: body.bookingPolicy,
        stars: body.stars,
        minPrice: body.minPrice,
        address: address,
        freeCancellation: body.freeCancellation,
        serviceType: serviceType,
        currency: currency
      });
    } else {
      const city = await this.cityRepository.findOne({ name: body.city });

      const address = await this.addressRepository.save({
        street: body.street,
        number: body.numberOnStreet,
        part: body.part,
        city: city,
        hotels: Promise.resolve(hotel)
      });

      const serviceType = await this.serviceTypeRepository.save({
        name: body.serviceType
      });

      const currency = await this.currencyRepository.save({
        name: body.currency
      });

      await this.hotelsRepository.update(params.id, {
        name: body.name,
        description: body.description,
        bookingPolicy: body.bookingPolicy,
        stars: body.stars,
        minPrice: body.minPrice,
        address: address,
        freeCancellation: body.freeCancellation,
        serviceType: serviceType,
        currency: currency
      });
    }

    return {
      id: hotel.id,
      name: body.name,
      send: 'описание дополненно'
    };
  }

  @Patch(':id/2')
  async changeHotelSecondStep(
    @Param('id') id: string,
    @Body()
    body: {
      food: {
        id: string;
        boardBasisDefault: {
          id: string;
          name: string;
        };
        price: number;
      }[];
    }
  ): Promise<any> {
    const hotel = await this.hotelsRepository.findOne({ id });

    for (const food of body.food) {
      if (food.id.length > 0) {
        await this.hotelBoardBasisRepository.update(food.id, {
          price: food.price
        });
      } else {
        const boardBasis = await this.boardBasisRepository.findOne(
          food.boardBasisDefault.id
        ); //пока не заполнена таблица с потоянной едой ничего в последню графу приходить не будет

        await this.hotelBoardBasisRepository.save({
          hotel: hotel,
          boardBasis: boardBasis,
          price: food.price
        });
      }
    }

    return {
      id: id,
      name: hotel.name,
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

    return {
      send: `food delete`
    };
  }

  @Patch(':id/3')
  async changeHotelThirdStep(
    @Param('id') id: string,
    @Body()
    body: {
      id: string;
      distanceOfCenter: string;
      distanceOfMetro: string;
      distanceOfBeach: string;
    }
  ): Promise<any> {
    const hotel = await this.hotelsRepository.findOne({ id });

    if (body.id.length > 0) {
      await this.distanceRepository.update(body.id, {
        distanceOfCenter: body.distanceOfCenter,
        distanceOfMetro: body.distanceOfMetro,
        distanceOfBeach: body.distanceOfBeach
      });
    } else {
      await this.distanceRepository.save({
        distanceOfCenter: body.distanceOfCenter,
        distanceOfMetro: body.distanceOfMetro,
        distanceOfBeach: body.distanceOfBeach,
        hotel: hotel
      });
    }

    return {
      id: id,
      name: hotel.name,
      send: 'расстояние дополненно'
    };
  }

  @Patch(':id/4')
  async changeHotelFourthStep(
    @Param('id') id: string,
    @Body()
    body: {
      services: {
        id: string;
        category: string;
        name: string;
        price: number;
        icon: string;
      }[];
    }
  ): Promise<any> {
    const hotel = await this.hotelsRepository.findOne({ id });

    for (const service1 of body.services) {
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

        await this.serviceRepository.save({
          price: service1.price,
          name: service1.name,
          category: category,
          icon: service1.icon,
          hotels: [hotel]
        });
      }
    }

    return {
      id: id,
      send: 'сервисы дополненно'
    };
  }

  @Delete(':id/4/:serviceId')
  async deleteService(@Param() params): Promise<any> {
    const service = await this.serviceRepository.findOne({
      id: params.serviceId
    });
    await this.serviceRepository.remove(service);

    return {
      send: `service delete`
    };
  }

  @Post(':id/rooms')
  async createRoom(
    @Param() params,
    @Body()
    body: {
      name: string;
      price: number;
      count: number;
      description: string;
      capacity: number;
      beds: string;
      amenities: {
        name: string;
        default: boolean;
        price: number;
        icon: string;
      }[];
      photos: {
        name: string;
        src: string;
      }[];
    }
  ): Promise<any> {
    const hotel = await this.hotelsRepository.findOne(params.id);

    const room = new Room();
    room.name = body.name;
    room.price = body.price;
    room.count = body.count;
    room.description = body.description;
    room.capacity = body.capacity;
    room.hotel = Promise.resolve(hotel);
    await this.roomRepository.manager.save(room);

    const room1 = await this.roomRepository.findOne({
      name: body.name,
      price: body.price,
      description: body.description
    });

    for (const photo of body.photos) {
      const photo1 = new Photo();
      photo1.name = photo.name;
      photo1.src = photo.src;
      photo1.room = Promise.resolve(room1);
      photo1.hotel = Promise.resolve(hotel);
      await this.photoRepository.manager.save(photo1);
    }

    await this.bedsRepository.save({
      name: body.beds,
      rooms: [room1]
    });

    for (const a of body.amenities) {
      const amenities = await this.amenitiesRepository.save({
        name: a.name,
        default: a.default,
        icon: a.icon
      });

      await this.amenitiesRoomRepository.save({
        price: a.price,
        room: room1,
        amenities: amenities
      });
    }

    return {
      hotelId: hotel.id,
      id: room1.id,
      send: 'комната успешно создана'
    };
  }

  @Patch(':id/rooms/:roomId')
  async changeRoom(
    @Param() params,
    @Body()
    body: {
      name: string;
      price: number;
      count: number;
      description: string;
      capacity: number;
      beds: string;
      bedsId: string;
      amenities: {
        id: string;
        name: string;
        default: boolean;
        price: number;
        icon: string;
      }[];
      photo: {
        id: string;
        name: string;
        src: string;
      }[];
    }
  ): Promise<any> {
    await this.roomRepository.update(params.roomId, {
      name: body.name,
      price: body.price,
      count: body.count,
      description: body.description,
      capacity: body.capacity
    });

    const hotel = await this.hotelsRepository.findOne(params.id);
    const room = await this.roomRepository.findOne(params.roomId);

    await this.bedsRepository.update(body.bedsId, {
      name: body.beds
    });

    for (const a of body.amenities) {
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

    for (const p of body.photo) {
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
    const changedRoom = await this.roomRepository.findOne(params.roomId);

    return {
      hotelId: await this.hotelsRepository.findOne(params.id),
      id: changedRoom.id,
      send: 'комната успешно change'
    };
  }

  @Delete(':id/room/:amenitiesId')
  async deleteAmenities(@Param() params): Promise<any> {
    const amenities = await this.amenitiesRepository.findOne({
      id: params.amenitiesId
    });
    await this.serviceRepository.delete(amenities);

    const amenitiesRoom = await this.amenitiesRoomRepository.findOne({
      id: params.amenitiesId
    });
    await this.serviceRepository.delete(amenitiesRoom);

    return {
      send: `amenities delete`
    };
  }

  @Delete(':id/room/:photoId')
  async deletePhotoRoom(@Param() params): Promise<any> {
    const photo = await this.photoRepository.findOne({ id: params.photo.id });
    await this.photoRepository.delete(photo);

    return {
      send: `photo room delete`
    };
  }

  @Patch(':id/5')
  async changeHotelFiveStep(
    @Param('id') id: string,
    @Body()
    body: {
      mainPhoto: {
        id: string;
        name: string;
        src: string;
      }[];

      photos: {
        id: string;
        name: string;
        src: string;
      }[];
    }
  ): Promise<any> {
    const hotel = await this.hotelsRepository.findOne({ id });

    for (const photo of body.photos) {
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

    for (const photo of body.mainPhoto) {
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

    return {
      id: id,
      send: 'фото дополненно'
    };
  }

  @Delete(':id/5:photoId')
  async deletePhotoHotel(@Param() params): Promise<any> {
    const photo = await this.photoRepository.findOne({ id: params.photo.id });
    await this.photoRepository.delete(photo);

    return {
      send: `photo room delete`
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

  @Delete(':id')
  async deleteHotel(@Param('id') id: string): Promise<any> {
    await this.hotelsRepository.delete({ id });

    return {
      send: `hotel delete`
    };
  }

  @Delete(':id/rooms/:roomId')
  async deleteRoom(@Param() params): Promise<any> {
    await this.roomRepository.delete(params.roomId);

    return {
      send: 'комната удалена'
    };
  }
}
