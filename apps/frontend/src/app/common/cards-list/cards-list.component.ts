import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'b-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.less']
})
export class CardsListComponent implements OnInit {
  someData;
  carts = [
    {
      name: 'Name',
      hotelImgUrl: 'string',
      description: 'Описание',
      address: 'AddressModel',
      starsCount: '7',
      countReviews: '7',
      hotelRating: '7',
      minPrice: '7',
      currency: 'Рублей',
      freeCancellation: false,
      services: 'ServiceType'
    }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('/api/hotels').subscribe(
      data => {
        // this.carts.push(data);
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
