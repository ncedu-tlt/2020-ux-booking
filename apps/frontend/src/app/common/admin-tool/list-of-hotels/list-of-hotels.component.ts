import { ButtonIconTypesEnum } from '../../../enums/button-icon-types.enum';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  Item,
  TableButtonClick,
  TableConfig
} from '../../../models/table.model';
import { HotelDataService } from '../../../services/hotel-data.service';
import { HotelCreationPopupComponent } from '../hotel-creation-popup/hotel-creation-popup.component';
import { Router } from '@angular/router';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
@Component({
  selector: 'b-list-of-hotels',
  templateUrl: './list-of-hotels.component.html',
  styleUrls: ['./list-of-hotels.component.less']
})
export class ListOfHotelsComponent implements OnInit {
  config: TableConfig;

  configTemplate: TableConfig = {
    items: [],
    columns: ['name', 'country', 'city'],
    headers: {
      name: this.i18NextService.t('adminTool.list-of-hotels.popup.table.name'),
      country: this.i18NextService.t(
        'adminTool.list-of-hotels.popup.table.country'
      ),
      city: this.i18NextService.t('adminTool.list-of-hotels.popup.table.city')
    },
    buttons: [ButtonIconTypesEnum.edit, ButtonIconTypesEnum.delete]
  };

  @ViewChild(HotelCreationPopupComponent) popup: HotelCreationPopupComponent;

  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
    private hotelDataService: HotelDataService,
    private router: Router
  ) {}

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
    const id: string = event.item.id;
    if (event.buttonType === ButtonIconTypesEnum.delete) {
      this.deleteHotel(id);
    }
    if (event.buttonType === ButtonIconTypesEnum.edit) {
      this.router.navigate(['/admin-tool/hotel/', id]);
    }
  }
}
