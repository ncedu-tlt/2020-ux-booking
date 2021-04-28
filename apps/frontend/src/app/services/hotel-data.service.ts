import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HotelInfoModel } from '../models/hotel-Info.model';

@Injectable()
export class HotelDataService {
  hotelsInfo: HotelInfoModel[] = [
    {
      name: 'Hotel super puper ',
      hotelImgUrl: 'assets/icons/hotel.jpg',
      description:
        'первый, eos elmet, consectetur adipisicing eos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuselit. Adipisci animi commodi cum debitis ' +
        'delectus dolore doloremque, eos e',
      address: {
        country: 'russia',
        city: 'moscow'
      },
      starsCount: 1,
      countReviews: 10,
      hotelRating: 9.6,
      minPrice: 2300,
      currency: '$',
      freeCancellation: true,
      services: [
        {
          name: 'car',
          iconUrl: 'assets/icons/car.svg'
        },
        {
          name: 'dryer',
          iconUrl: 'assets/icons/dryer.svg'
        }
      ]
    },
    {
      name: 'Hotel super puper ',
      hotelImgUrl: 'assets/icons/hotel1.jpg',
      description:
        'второй, eos elmet, consectetur adipisicing eos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuselit. Adipisci animi commodi cum debitis ' +
        'delectus dolore doloremque, eos e',
      address: {
        country: 'russia',
        city: 'moscow'
      },
      starsCount: 1,
      countReviews: 10,
      hotelRating: 9.6,
      minPrice: 2300,
      currency: '$',
      freeCancellation: true,
      services: [
        {
          name: 'car',
          iconUrl: 'assets/icons/car.svg'
        },
        {
          name: 'dryer',
          iconUrl: 'assets/icons/dryer.svg'
        }
      ]
    },
    {
      name: 'Hotel super puper ',
      hotelImgUrl: 'assets/icons/hotel2.jpg',
      description:
        'третий, eos elmet, consectetur adipisicing eos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuselit. Adipisci animi commodi cum debitis ' +
        'delectus dolore doloremque, eos e',
      address: {
        country: 'russia',
        city: 'moscow'
      },
      starsCount: 1,
      countReviews: 10,
      hotelRating: 9.6,
      minPrice: 2300,
      currency: '$',
      freeCancellation: true,
      services: [
        {
          name: 'car',
          iconUrl: 'assets/icons/car.svg'
        },
        {
          name: 'dryer',
          iconUrl: 'assets/icons/dryer.svg'
        }
      ]
    }
  ];

  getHotels(): Observable<HotelInfoModel[]> {
    return of(this.hotelsInfo);
  }
}
