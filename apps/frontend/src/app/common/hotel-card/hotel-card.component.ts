import { Component, Input } from '@angular/core';
import { ButtonIconTypesEnum } from '../../enums/button-icon-types.enum';
import { HotelInfoModel } from '../../models/hotelInfo.model';

@Component({
  selector: 'b-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.less']
})
export class HotelCardComponent {
  @Input()
  hotelInfo: HotelInfoModel;

  isSizeMobile = false;

  buttonIconTypesEnum: typeof ButtonIconTypesEnum = ButtonIconTypesEnum;
}
