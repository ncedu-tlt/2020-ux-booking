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
import { FormBuilder, FormGroup } from '@angular/forms';
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

  hotelFilter: FormGroup;

  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
    private hotelDataService: HotelDataService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.config = this.configTemplate;
    this.hotelFilter = this.formBuilder.group({
      name: ['', []],
      country: ['', []],
      city: ['', []]
    });
    this.loadHotels();
  }

  loadHotels(): void {
    const filter = {
      name: this.hotelFilter.value.name,
      country: this.hotelFilter.value.country,
      city: this.hotelFilter.value.city
    };
    this.hotelDataService.getHotels(filter).subscribe(hotels => {
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
