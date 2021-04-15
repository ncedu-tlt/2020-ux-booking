export class HotelInfoModel {
  constructor(
    public name: string,
    public hotelImgUrl: string,
    public description: string,
    public address: {
      country: string;
      city: string;
    },
    public starsCount: number,
    public countReviews: number,
    public hotelRating: number,
    public minPrice: number,
    public currency: string,
    public freeCancellation: boolean,
    public services: { iconUrl }[]
  ) {}
}
