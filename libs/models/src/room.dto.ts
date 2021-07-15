import { AmenitiesDto } from '@booking/models/amenities.dto';
import { PhotosRoomDto } from '@booking/models/photos-room.dto';
import { BedsDto } from '@booking/models/beds.dto';

export interface RoomDto {
  send?: string;
  id?: string;
  name?: string;
  price?: number;
  count?: number;
  description?: string;
  capacity?: number;
  beds?: BedsDto[];
  amenities?: AmenitiesDto[];
  photos?: PhotosRoomDto[];
}
