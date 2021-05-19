import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
import { NearbyPlaces } from '../db/domain/nearbyPlaces.dao';
import { Leisure } from '../db/domain/leisure.dao';
import { BoardBasis } from '../db/domain/board_basis.dao';
import { HotelBoardBasis } from '../db/domain/hotel_board_basis.dao';
import { Room } from '../db/domain/room.dao';
import { Amenities } from '../db/domain/ameniries.dao';
import { AmenitiesRoom } from '../db/domain/amenities_room.dao';
import { Bed } from '../db/domain/bed.dao';
import { Review } from '../db/domain/review.dao';
import { Comments } from '../db/domain/comment.dao';

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

    @InjectRepository(NearbyPlaces)
    private nearbyPlacesRepository: Repository<NearbyPlaces>,

    @InjectRepository(Leisure)
    private leisureRepository: Repository<Leisure>,

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
    private BedsRepository: Repository<Bed>,

    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,

    @InjectRepository(Comments)
    private commentsRepository: Repository<Comments>
  ) {}

  @Get(':id')
  async getHotel(@Param() params): Promise<any> {
    return await this.hotelsRepository.findOne(params.id);
  }

  @Get()
  async getHotels(): Promise<any> {
    return await this.hotelsRepository.find();
  }

  /*@Get(':id/room/:roomId')
  async getHo(@Param() params): Promise<any> {
    return {
      send: params.id,
      sends: params.roomId
    };
  }*/

  @Get(':id/room/:roomId')
  async getRoom(@Param() params): Promise<any> {
    return await this.roomRepository.findByIds([params.id, params.roomId]);
  }

  @Get('/rooms')
  async getRooms(): Promise<any> {
    return await this.roomRepository.find();
  }

  @Post(':id/rooms')
  async createRoom(
    @Param() params,
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
      photo: {
        name: string;
        src: string;
      }[];
    }
  ): Promise<any> {
    const hotel = await this.hotelsRepository.findOne(params.id);

    const room2 = await this.roomRepository.save({
      name: body.name,
      price: body.price,
      count: body.count,
      description: body.description,
      capacity: body.capacity,
      hotel: Promise.resolve(hotel)
    });

    for (const p of body.photo) {
      const photo = await this.photoRepository.save({
        name: p.name,
        src: p.src,
        room: Promise.resolve(room2)
      });
    }

    await this.BedsRepository.save({
      name: body.beds,
      rooms: Promise.resolve(room2)
    });

    for (const amenities1 of body.amenities) {
      const amenities2 = await this.amenitiesRepository.save({
        name: amenities1.name,
        default: amenities1.default,
        icon: amenities1.icon
      });

      const amenitiesRoom = await this.amenitiesRoomRepository.save({
        price: amenities1.price,
        room: room2,
        amenities: amenities2
      });
    }

    return {
      id: room2.id,
      send: 'комната успешно дополнена'
    };
  }

  @Patch(':id/rooms/:roomId')
  async changeRoom(
    @Param() params,
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
      photo: {
        name: string;
        src: string;
      };
    }
  ): Promise<any> {
    const hotel = await this.hotelsRepository.findOne(params.id);

    const room2 = await this.roomRepository.update(params.roomId, {
      name: body.name,
      price: body.price,
      count: body.count,
      description: body.description,
      capacity: body.capacity,
      hotel: Promise.resolve(hotel)
    });

    const room3 = await this.roomRepository.findOne(params.roomId);

    await this.BedsRepository.update(params.roomId, {
      name: body.beds,
      rooms: Promise.resolve(room2)
    });

    for (const amenities1 of body.amenities) {
      await this.amenitiesRepository.update(params.roomId, {
        name: amenities1.name,
        default: amenities1.default,
        icon: amenities1.icon
      });

      const amenities = await this.amenitiesRepository.findOne(params.roomId);

      const amenitiesRoom = await this.amenitiesRoomRepository.update(
        params.roomId,
        {
          price: amenities1.price,
          room: room3,
          amenities: amenities
        }
      );
    }

    return {
      send: 'комната успешно дополнена'
    };
  }

  @Delete(':id/rooms/:roomId')
  async deleteRoom(@Param() params): Promise<any> {
    await this.roomRepository.delete(params.roomId);

    return {
      send: 'комната удалена'
    };
  }

  @Patch(':id/1')
  async changeHotelFirstStep(
    @Param('id') id: string,
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
      city: city
    });

    const serviceType = await this.serviceTypeRepository.save({
      name: body.serviceType
    });

    const currency = await this.currencyRepository.save({
      name: body.currency
    });

    await this.hotelsRepository.update(
      { id },
      {
        name: body.name,
        description: body.description,
        bookingPolicy: body.bookingPolicy,
        stars: body.stars,
        minPrice: body.minPrice,
        address: address,
        freeCancellation: body.freeCancellation,
        serviceType: serviceType,
        currency: currency
      }
    );

    return {
      id: id,
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
        name: string;
        price: number;
      }[];
    }
  ): Promise<any> {
    const hotel = await this.hotelsRepository.findOne({ id });

    for (const food of body.food) {
      const boardBasis = await this.boardBasisRepository.save({
        name: food.name
      });

      const hotelBoardBasis = await this.hotelBoardBasisRepository.save({
        hotel: hotel,
        boardBasis: boardBasis,
        price: food.price
      });
    }

    return {
      id: id,
      name: hotel.name,
      send: 'питание дополненно'
    };
  }

  @Patch(':id/3')
  async changeHotelThirdStep(
    @Param('id') id: string,
    @Body()
    body: {
      distanceOfCenter: string;
      distanceOfMetro: string;
      distanceOfBeach: string;
    }
  ): Promise<any> {
    const hotel = await this.hotelsRepository.findOne({ id });

    await this.distanceRepository.save({
      distanceOfCenter: body.distanceOfCenter,
      distanceOfMetro: body.distanceOfMetro,
      distanceOfBeach: body.distanceOfBeach,
      hotel: hotel
    });

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
        category: string;
        name: string;
        price: number;
        icon: string;
      }[];
    }
  ): Promise<any> {
    const hotel = await this.hotelsRepository.findOne({ id });
    for (const service1 of body.services) {
      const category = await this.categoryRepository.save({
        name: service1.category
      });

      await this.serviceRepository.save({
        price: service1.price,
        name: service1.name,
        category: category,
        icon: service1.icon,
        hotels: Promise.resolve(hotel)
      });
    }

    return {
      id: id,
      send: 'сервисы дополненно'
    };
  }

  @Patch(':id/5')
  async changeHotelFiveStep(
    @Param('id') id: string,
    @Body()
    body: {
      mainPhoto: {
        name: string;
        src: string;
      }[];

      photos: {
        name: string;
        src: string;
      }[];
    }
  ): Promise<any> {
    const hotel = await this.hotelsRepository.findOne({ id });
    for (const mainPhoto of body.mainPhoto) {
      const mainPhotos1 = await this.photoRepository.save({
        name: mainPhoto.name,
        src: mainPhoto.src,
        hotel: Promise.resolve(hotel)
      });

      await this.hotelsRepository.update(
        { id },
        {
          mainPhoto: mainPhotos1
        }
      );
    }

    for (const photo of body.photos) {
      await this.photoRepository.save({
        name: photo.name,
        src: photo.src,
        hotel: Promise.resolve(hotel)
      });
    }

    return {
      id: id,
      send: 'сервисы дополненно'
    };
  }

  @Delete(':id')
  async deleteHotel(@Param('id') id: string): Promise<any> {
    await this.hotelsRepository.delete({ id });

    return {
      send: `hotel delete`
    };
  }
}
