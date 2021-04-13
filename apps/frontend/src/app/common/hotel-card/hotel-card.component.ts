import { Component, Input } from '@angular/core';

@Component({
  selector: 'b-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.less']
})
export class HotelCardComponent {
  @Input()
  hotelInfo: any;
}
