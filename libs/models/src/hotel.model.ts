import { ServicesModel } from '@booking/models/services.model';
import { AddressModel } from '@booking/models/address.model';
import { ServiceTypeModel } from '@booking/models/serviceType.model';
import { CurrencyModel } from '@booking/models/currency.model';
import { MainPhotoModel } from '@booking/models/mainPhoto.model';
import { PhotosModel } from '@booking/models/photos.model';
import { DistanceModel } from '@booking/models/distance.model';
import { HotelBoardBasisModel } from '@booking/models/hotelBoardBasis.model';

export interface HotelModel {
  id?: string;
  name?: string;
  description?: string;
  bookingPolicy?: string;
  stars?: number;
  minPrice?: number;
  freeCancellation?: boolean;
  services?: ServicesModel[];
  address?: AddressModel;
  serviceType?: ServiceTypeModel;
  currency?: CurrencyModel;
  mainPhoto?: MainPhotoModel;
  photos?: PhotosModel[];
  distance?: DistanceModel;
  hotelBoardBasis?: HotelBoardBasisModel[];
}
