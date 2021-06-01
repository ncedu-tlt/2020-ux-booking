import { ServicesDto } from '@booking/models/services.dto';
import { PhotosDto } from '@booking/models/photos.dto';
import { AddressDto } from '@booking/models/addressDto';
import { ServiceTypeDto } from '@booking/models/serviceType.dto';
import { CurrencyDto } from '@booking/models/currency.dto';
import { DistanceDto } from '@booking/models/distance.dto';
import { HotelBoardBasisDto } from '@booking/models/hotelBoardBasis.dto';
import { MainPhotoDto } from '@booking/models/mainPhoto.dto';

export interface HotelDto {
  send?: string;
  id?: string;
  name?: string;
  description?: string;
  bookingPolicy?: string;
  stars?: number;
  minPrice?: number;
  freeCancellation?: boolean;
  services?: ServicesDto[];
  address?: AddressDto;
  serviceType?: ServiceTypeDto;
  currency?: CurrencyDto;
  mainPhoto?: MainPhotoDto;
  photos?: PhotosDto[];
  distance?: DistanceDto;
  hotelBoardBasis?: HotelBoardBasisDto[];
}
