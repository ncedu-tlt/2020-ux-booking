import { ButtonIconTypesEnum } from '../../enums/button-icon-types.enum';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Item, TableConfig } from '../../models/table.model';
import { HotelDataService } from '../../services/hotel-data.service';

@Component({
  selector: 'b-list-of-hotels',
  templateUrl: './list-of-hotels.component.html',
  styleUrls: ['./list-of-hotels.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListOfHotelsComponent implements OnInit {

  config: TableConfig;

  configTemplate: TableConfig = {
    items: [],
    columns: ['name', 'country', 'city'],
    headers: {
      name: 'Название',
      country: 'Страна',
      city: 'Город'
    },
    buttons: [ButtonIconTypesEnum.edit, ButtonIconTypesEnum.delete]
  };

  constructor(private hotelDataService: HotelDataService) {}

  ngOnInit(): void {
    this.config = this.configTemplate;
    this.loadHotels();
  }

  loadHotels(): void {
    this.hotelDataService.getHotels().subscribe(hotels => {
      const hotelItems = hotels.map(hotel => {
        return {
          id: hotel.id,
          name: hotel.name,
          country: hotel.address?.city?.country?.name,
          city: hotel.address?.city?.name
        } as Item;
      });
      this.config = {
        ...this.configTemplate,
        items: hotelItems
      };
    });
  }
}
