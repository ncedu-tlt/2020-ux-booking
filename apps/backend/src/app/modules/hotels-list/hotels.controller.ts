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
    private addressRepository: Repository<Address>
  ) {}

  /*@Get(':id')
  async getHotel(
    @Param('id') id: string
  ): Promise<{ name: string; description: string }> {
    const hotels = await this.hotelsRepository.find();
    const hotel = hotels.map(m => ({
      id: m.id,
      name: m.name,
      description: m.description
      /!*bookingPolicy: m.bookingPolicy,
      stars: m.stars,
      minPrice: m.minPrice,
      freeCancellation: m.freeCancellation,
      address: m.address,
      serviceType: m.serviceType,
      currencies: m.currencies,
      photos: m.photos,
      paymentMethods: m.paymentMethods,
      hotelBoardBasis: m.hotelBoardBasis,
      bookingConditions: m.bookingConditions*!/
    }));
    return hotel.find(el => el.id === id);
  }*/

  @Get(':id')
  async getHotel(@Param('id') id: string): Promise<any> {
    return await this.hotelsRepository.findOne({ id });
  }

  @Get()
  async getHotels(): Promise<any> {
    return await this.hotelsRepository.find();
  }

  @Post()
  async addHotel(
    @Body()
    body: {
      /*id: string;*/
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

      /*
      serviceType: any;
      currencies: string;
      paymentMethods: string;
      typeOfAllocation: string;
      food: string;
      priceFood: string;

      distanceToBeach: string;
      distanceToCenter: string;
      distanceToMetro: string;

      photos: string;
      hotelBoardBasis: string;
      bookingConditions: string;*/
    }
  ): Promise<any> {
    const country = await this.countryRepository.save({
      name: body.country
    });

    const city = await this.cityRepository.save({
      name: body.city,
      country: Country[country.id]
    });

    const address = await this.addressRepository.save({
      street: body.street,
      number: body.numberOnStreet,
      part: body.part,
      city: City[city.id]
    });
    await this.hotelsRepository.save({
      name: body.name,
      description: body.description,
      bookingPolicy: body.bookingPolicy,
      stars: body.stars,
      minPrice: body.minPrice,
      address: Address[address.id],
      freeCancellation: body.freeCancellation

      /*name: body.name,
      description: body.description,
      bookingPolicy: body.bookingPolicy,
      starsCount: body.starsCount,
      minPrice: body.minPrice,
      serviceType: body.serviceType,
      freeCancellation: body.freeCancellation,

      address: address.id*/

      /*stars: body.stars,
      minPrice: body.minPrice,
      freeCancellation: body.freeCancellation*/
    });

    return {
      id: `send good` /*hotels.id,
      name: hotels.name,
      description: hotels.description*/
      /*bookingPolicy: hotels.bookingPolicy,
      stars: hotels.stars,
      minPrice: hotels.minPrice,
      freeCancellation: hotels.freeCancellation*/
    };
  }

  @Patch(':id')
  async changeHotel(
    @Param('id') id: string,
    @Body()
    body: {
      name?: string;
      description?: string;
    }
  ): Promise<any> {
    await this.hotelsRepository.update(
      { id },
      {
        name: body?.name,
        description: body?.description
      }
    );

    return {
      id: id,
      name: body.name,
      description: body.description
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
