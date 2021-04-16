import { Component, Input } from '@angular/core';
import { HotelInfoModel } from '../../models/hotelInfo.model';

@Component({
  selector: 'b-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.less']
})
export class BannerComponent {
  @Input()
  hotelInfo: HotelInfoModel;

  imageHotel = '';

  imagesHotels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
}
