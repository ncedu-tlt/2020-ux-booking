import { AddressModel } from './address.model';
import { ServiceType } from './hotel-service.model';

export type HotelInfoModel = {
  id: string;
  name: string;
  hotelImgUrl: string;
  description: string;
  address: AddressModel;
  starsCount: number;
  countReviews: number;
  hotelRating: number;
  minPrice: number;
  currency: string;
  freeCancellation: boolean;
  services: ServiceType[];
};
