import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Headers,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from '../db/domain/hotel.dao';
import { Service } from '../db/domain/service.dao';
import { Photo } from '../db/domain/photo.dao';
import { BoardBasis } from '../db/domain/board_basis.dao';
import { HotelBoardBasis } from '../db/domain/hotel_board_basis.dao';
import { Room } from '../db/domain/room.dao';
import { Amenities } from '../db/domain/ameniries.dao';
import { AmenitiesRoom } from '../db/domain/amenities_room.dao';
import { HotelDto } from '@booking/models/hotel.dto';
import { Response } from 'express';
import { HotelBoardBasisDto } from '@booking/models/hotelBoardBasis.dto';
import { DistanceDto } from '@booking/models/distance.dto';
import { ServicesDto } from '@booking/models/services.dto';
import { RoomDto } from '@booking/models/room.dto';
import { HotelsService } from './hotels.service';
import {
  RELATIONS_GET_HOTEL_FOOD,
  RELATIONS_GET_HOTEL_ID,
  RELATIONS_GET_HOTEL_SERVICES,
  RELATIONS_GET_HOTELS,
  RELATIONS_GET_ROOM,
  RELATIONS_GET_ROOMS_BEDS,
  RELATIONS_GET_ROOMS_PHOTOS
} from './hotels.constants';
import { HotelsConversionService } from './hotels-conversion.service.';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/hotels')
export class HotelsController {
  constructor(
    @InjectRepository(Hotel)
    private hotelsRepository: Repository<Hotel>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
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
    private hotelsService: HotelsService,
    private hotelsConversionService: HotelsConversionService
  ) {}

  @Get(':id')
  async getHotel(@Param() params): Promise<HotelDto> {
    const hotel: Hotel = await this.hotelsRepository.findOne(params.id, {
      relations: RELATIONS_GET_HOTEL_ID
    });
    return this.hotelsConversionService.convertHotel(hotel);
  }

  @Get()
  async getHotels(
    @Headers() range: number,
    take: number,
    @Res() res: Response
  ): Promise<void> {
    await this.hotelsRepository
      .find({
        relations: RELATIONS_GET_HOTELS /*,
        skip: range,
        take: take*/
      })
      .then(hotelsList => {
        res.status(HttpStatus.OK).send(
          hotelsList.map(hotel => ({
            id: hotel.id,
            name: hotel.name,
            address: hotel.address
          }))
        );
      })
      .catch(error => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
      });
  }

  @Get(':id/rooms/:roomId')
  async getRoom(@Param() params): Promise<RoomDto> {
    const room: Room = await this.roomRepository.findOne(params.roomId, {
      relations: RELATIONS_GET_ROOM
    });
    return this.hotelsConversionService.convertRoom(room);
  }

  @Get(':id/rooms')
  async getRooms(
    @Param() params,
    @Headers() range: number,
    take: number,
    @Res() res: Response
  ): Promise<void> {
    await this.roomRepository
      .find({
        relations: RELATIONS_GET_ROOMS_BEDS,
        where: {
          hotel: params.id
        },
        take: take
      })
      .then(value => {
        res.status(HttpStatus.OK).send(
          value.map(room => ({
            id: room.id,
            name: room.name,
            capacity: room.capacity,
            count: room.count,
            beds: room.beds,
            price: room.price
          }))
        );
      })
      .catch(error => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
      });
  }

  @Post(':id/rooms')
  async createRoom(
    @Param() params,
    @Body() roomDto: RoomDto,
    @UploadedFiles() photos
  ): Promise<RoomDto> {
    const hotel: Hotel = await this.hotelsRepository.findOne(params.id);
    return await this.hotelsService.createRoom(hotel, roomDto, hotel.photos);
  }

  @Patch(':id/rooms/:roomId')
  async changeRoom(
    @Param() params,
    @Body() roomDto: RoomDto,
    @UploadedFiles() photos
  ): Promise<RoomDto> {
    return this.hotelsService.changeRoom(
      roomDto,
      params.id,
      params.roomId,
      photos
    );
  }

  @Delete(':id/room/:roomId/:amenitiesId')
  async deleteAmenities(@Param() params): Promise<RoomDto> {
    const amenities: Amenities = await this.amenitiesRepository.findOne({
      id: params.amenitiesId
    });
    await this.serviceRepository.delete(amenities);

    const amenitiesRoom: AmenitiesRoom = await this.amenitiesRoomRepository.findOne(
      {
        id: params.amenitiesId
      }
    );
    await this.serviceRepository.delete(amenitiesRoom);
    const room: Room = await this.roomRepository.findOne(params.roomId, {
      relations: RELATIONS_GET_ROOM
    });
    return {
      amenities: room.amenitiesRoom
    };
  }

  @Delete(':id/room/:roomId/:photoId')
  async deletePhotoRoom(@Param() params): Promise<RoomDto> {
    const photo: Photo = await this.photoRepository.findOne({
      id: params.photo.id
    });
    await this.photoRepository.delete(photo);

    const room: Room = await this.roomRepository.findOne(params.roomId, {
      relations: RELATIONS_GET_ROOMS_PHOTOS
    });
    return {
      photos: this.hotelsConversionService.convertPhotoRoomDaoToDto(
        await room.photos
      )
    };
  }

  @Delete(':id/rooms/:roomId')
  async deleteRoom(@Param() params): Promise<RoomDto> {
    await this.roomRepository.delete(params.roomId);

    return {};
  }

  @Post()
  async addHotel(
    @Body()
    body: {
      name: string;
    }
  ): Promise<HotelDto> {
    const hotel: Hotel = await this.hotelsRepository.save({
      name: body.name
    });

    return {
      id: hotel.id
    };
  }

  @Patch(':id/mainInfo')
  async changeHotelMainInfo(
    @Param() params,
    @Body() hotelDto: HotelDto
  ): Promise<HotelDto> {
    return await this.hotelsService.changeHotelMainInfo(hotelDto, params.id);
  }

  @Patch(':id/foodHotel')
  async changeHotelFood(
    @Param() params,
    @Body() foods: HotelBoardBasisDto[]
  ): Promise<HotelDto> {
    return await this.hotelsService.changeHotelFood(foods, params.id);
  }

  @Delete(':id/foodHotel/:foodId')
  async deleteFood(@Param() params): Promise<HotelDto> {
    const food: HotelBoardBasis = await this.hotelBoardBasisRepository.findOne({
      hotel: params.id,
      boardBasis: params.foodId
    });
    await this.hotelBoardBasisRepository.delete(food);
    const updatedHotel: Hotel = await this.hotelsRepository.findOne(params.id, {
      relations: RELATIONS_GET_HOTEL_FOOD
    });
    return {
      hotelBoardBasis: updatedHotel.hotelBoardBasis
    };
  }

  @Patch(':id/distance')
  async changeHotelDistance(
    @Param() params,
    @Body() distance: DistanceDto
  ): Promise<HotelDto> {
    return await this.hotelsService.changeHotelDistance(distance, params.id);
  }

  @Patch(':id/services')
  async changeHotelServices(
    @Param() params,
    @Body() services: ServicesDto[]
  ): Promise<HotelDto> {
    return await this.hotelsService.changeHotelServices(services, params.id);
  }

  @Delete(':id/services/:serviceId')
  async deleteService(@Param() params): Promise<HotelDto> {
    const service: Service = await this.serviceRepository.findOne({
      id: params.serviceId
    });
    await this.serviceRepository.remove(service);

    const updatedHotel: Hotel = await this.hotelsRepository.findOne(params.id, {
      relations: RELATIONS_GET_HOTEL_SERVICES
    });

    return {
      services: this.hotelsConversionService.convertServiceDaoToDto(
        updatedHotel.services
      )
    };
  }

  @Patch(':id/photos')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'mainImg', maxCount: 1 },
      { name: 'img', maxCount: 10 }
    ])
  )
  async changeHotelPhotos(
    @Param() params,
    @UploadedFiles() photos
  ): Promise<HotelDto> {
    await this.hotelsService.changeHotelPhotos(photos, params.id);

    const hotel: Hotel = await this.hotelsRepository.findOne(params.hotelId, {
      relations: RELATIONS_GET_HOTEL_ID
    });
    return this.hotelsConversionService.convertHotel(hotel);
  }

  @Get('file/:id')
  @Header('Content-Type', 'image/jpeg')
  async getPhoto(@Param() params, @Res() res: Response): Promise<void> {
    const photo: Photo = await this.photoRepository.findOne(params.id);
    res.end(photo.src);
  }

  @Delete(':hotelId/photos/:id')
  async deletePhotoHotel(@Param() params): Promise<HotelDto> {
    const photo: Photo = await this.photoRepository.findOne(params.id);
    console.log(photo);
    await this.photoRepository.delete(photo.id);

    const hotel: Hotel = await this.hotelsRepository.findOne(params.hotelId, {
      relations: RELATIONS_GET_HOTEL_ID
    });
    return this.hotelsConversionService.convertHotel(hotel);
  }

  @Delete(':id')
  async deleteHotel(@Param() params): Promise<HotelDto> {
    const hotelDelete: Hotel = await this.hotelsRepository.findOne(params.id);
    if (!hotelDelete) return {};
    await this.hotelsRepository.delete(params.id);

    return {
      id: hotelDelete.id,
      name: hotelDelete.name
    };
  }
}
