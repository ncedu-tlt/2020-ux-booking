import { ButtonIconTypesEnum } from '../../enums/button-icon-types.enum';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Item, TableButtonClick, TableConfig } from '../../models/table.model';
import { HotelDataService } from '../../services/hotel-data.service';
import { ListOfHotelPopupComponent } from '../list-of-hotel-popup/list-of-hotel-popup.component';
@Component({
  selector: 'b-list-of-hotels',
  templateUrl: './list-of-hotels.component.html',
  styleUrls: ['./list-of-hotels.component.less'],
  changeDetection: ChangeDetectionStrategy.Default
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

  @ViewChild(ListOfHotelPopupComponent) popup: ListOfHotelPopupComponent;

  constructor(private hotelDataService: HotelDataService) {}

  ngOnInit(): void {
    this.config = this.configTemplate;
    this.loadHotels();
  }

  loadHotels(): void {
    this.hotelDataService.getHotels().subscribe(hotels => {
      const hotelItems: Item[] = hotels.map(hotel => {
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

  public deleteHotel(id: string): void {
    this.hotelDataService.deleteHotel(id).subscribe(res => {
      this.loadHotels();
    });
  }

  public buttonClicked(event: TableButtonClick): void {
    if (event.buttonType === ButtonIconTypesEnum.delete) {
      const id = event.item.id;
      this.deleteHotel(id);
    }
  }
}
