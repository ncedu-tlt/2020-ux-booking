/*import { ServicesModel } from '@booking/models/services.model';
import { AddressModel } from '@booking/models/address.model';
import { ServiceTypeModel } from '@booking/models/serviceType.model';
import { CurrencyModel } from '@booking/models/currency.model';
import { MainPhotoModel } from '@booking/models/mainPhoto.model';
import { PhotosModel } from '@booking/models/photos.model';
import { DistanceModel } from '@booking/models/distance.dto';*/

import { PhotosDto } from '@booking/models/photos.dto';
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
