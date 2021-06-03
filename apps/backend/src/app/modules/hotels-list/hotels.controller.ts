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
import { PhotosDto } from '@booking/models/photos.dto';
import { HotelsService } from './hotels.service';
import { RELATIONS_GET_HOTEL_ID } from './hotel.constants';

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
    private hotelsService: HotelsService
  ) {}

  @Get(':id')
  async getHotelById(@Param() params): Promise<HotelDto> {
    const hotel = await this.hotelsRepository.findOne(params.id, {
      relations: RELATIONS_GET_HOTEL_ID
    });
    return this.hotelsService.getHotelById(hotel);
  }

  @Get()
  async getHotels(
    @Headers('range') range: number,
    @Res() res: Response
  ): Promise<void> {
    const hotels = await this.hotelsRepository
      .find({
        relations: ['address', 'address.city', 'address.city.country'],
        skip: range,
        take: 10
      })
      .then(value => {
        res.status(HttpStatus.OK).send(
          value.map(m => ({
            id: m.id,
            name: m.name,
            address: m.address
          }))
        );
      })
      .catch(error => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        return error;
      });
    res.send(hotels);
  }

  @Get(':id/rooms/:roomId')
  async getRoomById(@Param() params): Promise<RoomDto> {
    const room = await this.roomRepository.findOne(params.roomId, {
      relations: ['beds', 'amenitiesRoom', 'amenitiesRoom.amenities', 'photos']
    });
    return this.hotelsService.getRoomById(room);
  }

  @Get(':id/rooms')
  async getRooms(
    @Param() params,
    @Headers('range') range: number,
    @Res() res: Response
  ): Promise<void> {
    const rooms = await this.roomRepository
      .find({
        relations: ['beds'],
        where: {
          hotel: params.id
        },
        skip: range,
        take: 10
      })
      .then(value => {
        res.status(HttpStatus.OK).send(
          value.map(m => ({
            id: m.id,
            name: m.name,
            capacity: m.capacity,
            beds: m.beds,
            price: m.price
          }))
        );
      })
      .catch(error => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        return error;
      });
    res.send(rooms);
  }

  @Post(':id/rooms')
  async createRoom(
    @Param() params,
    @Body() roomDto: RoomDto
  ): Promise<RoomDto> {
    const hotel = await this.hotelsRepository.findOne(params.id);
    return await this.hotelsService.createRoom(hotel, roomDto);
  }

  @Patch(':id/rooms/:roomId')
  async changeRoom(
    @Param() params,
    @Body() roomDto: RoomDto
  ): Promise<RoomDto> {
    return this.hotelsService.changeRoom(roomDto, params.id, params.roomId);
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
    const newRoom = await this.roomRepository.findOne(params.roomId, {
      relations: ['beds', 'amenitiesRoom', 'amenitiesRoom.amenities', 'photos']
    });
    return {
      send: 'комната обновлена',
      amenities: newRoom.amenitiesRoom
    };
  }

  @Delete(':id/room/:roomId/:photoId')
  async deletePhotoRoom(@Param() params): Promise<RoomDto> {
    const photo = await this.photoRepository.findOne({ id: params.photo.id });
    await this.photoRepository.delete(photo);

    const newRoom = await this.roomRepository.findOne(params.roomId, {
      relations: ['photos']
    });
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

  @Patch(':id/mainInfo')
  async changeHotelFirstStep(
    @Param() params,
    @Body() hotelDto: HotelDto
  ): Promise<HotelDto> {
    return await this.hotelsService.changeHotelFirstStep(hotelDto, params.id);
  }

  @Patch(':id/foodHotel')
  async changeHotelSecondStep(
    @Param() params,
    @Body() foods: HotelBoardBasisDto[]
  ): Promise<HotelDto> {
    return await this.hotelsService.changeHotelSecondStep(foods, params.id);
  }

  @Delete(':id/foodHotel/:foodId')
  async deleteFood(@Param() params): Promise<any> {
    const food = await this.hotelBoardBasisRepository.findOne({
      hotel: params.id,
      boardBasis: params.foodId
    });
    await this.hotelBoardBasisRepository.delete(food);
    const updatedHotel = await this.hotelsRepository.findOne(params.id, {
      relations: ['hotelBoardBasis', 'hotelBoardBasis.boardBasis']
    });
    return {
      hotelBoardBasis: updatedHotel.hotelBoardBasis,
      send: `food delete`
    };
  }

  @Patch(':id/addDistance')
  async changeHotelThirdStep(
    @Param() params,
    @Body() distance: DistanceDto
  ): Promise<HotelDto> {
    return await this.hotelsService.changeHotelThirdStep(distance, params.id);
  }

  @Patch(':id/services')
  async changeHotelFourthStep(
    @Param() params,
    @Body() services: ServicesDto[]
  ): Promise<HotelDto> {
    return await this.hotelsService.changeHotelFourthStep(services, params.id);
  }

  @Delete(':id/services/:serviceId')
  async deleteService(@Param() params): Promise<HotelDto> {
    const service = await this.serviceRepository.findOne({
      id: params.serviceId
    });
    await this.serviceRepository.remove(service);

    const updatedHotel = await this.hotelsRepository.findOne(params.id, {
      relations: ['services', 'services.category']
    });

    return {
      services: this.hotelsService.convertServiceDaoToDto(
        updatedHotel.services
      ),
      send: `service delete`
    };
  }

  @Patch(':id/photos')
  async changeHotelFiveStep(
    @Param() params,
    @Body() photos: PhotosDto
  ): Promise<HotelDto> {
    return await this.hotelsService.changeHotelFiveStep(photos, params.id);
  }

  @Delete(':id/photos/:photoId')
  async deletePhotoHotel(@Param() params): Promise<HotelDto> {
    const photo = await this.photoRepository.findOne({ id: params.photo.id });
    await this.photoRepository.delete(photo);

    const updatedHotel = await this.hotelsRepository.findOne(params.id, {
      relations: ['photos', 'mainPhoto']
    });
    const newPhotos = await updatedHotel.photos;
    const mainPhoto = await updatedHotel.mainPhoto;
    return {
      photos: this.hotelsService.convertPhotoDaoToDto(newPhotos),
      mainPhoto: mainPhoto,
      send: 'photo delete'
    };
  }

  @Delete(':id')
  async deleteHotel(@Param() params): Promise<HotelDto> {
    await this.hotelsRepository.delete(params.id);
    const hotelDelete = await this.hotelsRepository.findOne(params.id);

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
