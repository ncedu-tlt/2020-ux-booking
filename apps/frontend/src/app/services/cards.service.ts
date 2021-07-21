import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  constructor(private http: HttpClient) {}

  isTempPushActivated = true;
  cardsHotels = {
    name: 'Naxxme',
    hotelImgUrl: 'urlurl',
    description: 'loremloremloremloremloremloremloremloremloremloremloremlorem',
    address: 'AddressModel',
    stars: 7,
    countReviews: 7,
    hotelRating: 7,
    minPrice: 7,
    currency: 'Рублей',
    freeCancellation: false,
    services: 'ServiceType'
  };

  getCardsListData() {
    return this.http.get('/api/hotels', {
      headers: {
        range: ['0'],
        take: '100'
      }
    });
  }

  pushCardsData(data) {
    return this.http.post('/api/hotels', data);
  }

  tempPushData() {
    this.pushCardsData(this.cardsHotels).subscribe(
      () => {
        //
      },
      () => {
        //
      }
    );
    this.isTempPushActivated = false;
  }
}
