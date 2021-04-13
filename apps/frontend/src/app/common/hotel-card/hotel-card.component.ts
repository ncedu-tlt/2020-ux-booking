import { Component, Input } from '@angular/core';
import { ButtonIconTypesEnum } from '../../enums/button-icon-types.enum';

@Component({
  selector: 'b-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.less']
})
export class HotelCardComponent {
  @Input()
  hotelInfo: any;

  buttonIconTypesEnum: typeof ButtonIconTypesEnum = ButtonIconTypesEnum;
}
