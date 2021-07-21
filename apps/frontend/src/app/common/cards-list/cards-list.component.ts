import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'b-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.less']
})
export class CardsListComponent implements OnInit {
  someData;
  carts = [];

  constructor(private http: HttpClient, private CardsService: CardsService) {}

  ngOnInit(): void {
    this.CardsService.getCardsListData().subscribe(
      cartsData => {
        // for (const cart of cartsData) {
        //   this.carts.push(cart);
        // }
      },
      () => {
        //
      }
    );
  }
}
