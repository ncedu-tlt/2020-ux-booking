import { AddressModel } from './addressModel.model';
import { ServiceType } from './serviceType.model';

export class HotelInfoModel {
  constructor(
    public name: string,
    public hotelImgUrl: string,
    public description: string,
    public address: AddressModel,
    public starsCount: number,
    public countReviews: number,
    public hotelRating: number,
    public minPrice: number,
    public currency: string,
    public freeCancellation: boolean,
    public services: ServiceType
  ) {}
}
