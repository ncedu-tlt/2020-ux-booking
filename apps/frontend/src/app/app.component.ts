import { Component } from '@angular/core';

@Component({
  selector: 'b-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'frontend';
  hotelInfo: any = {
    name: 'Hotel super puper ',
    hotelImgUrl: 'assets/icons/hotel.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi commodi cum debitis delectus dolore doloremque, eos e',
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
        iconUrl: 'assets/icons/car.svg'
      },
      {
        iconUrl: 'assets/icons/dryer.svg'
      }
    ]
  };
}
