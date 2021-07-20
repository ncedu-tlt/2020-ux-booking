import { ButtonIconTypesEnum } from '../../enums/button-icon-types.enum';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Item, TableButtonClick, TableConfig } from '../../models/table.model';
import { HotelDataService } from '../../services/hotel-data.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'b-list-of-hotels',
  templateUrl: './list-of-hotels.component.html',
  styleUrls: ['./list-of-hotels.component.less'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ListOfHotelsComponent implements OnInit {
  @Output()
  addedEvent: EventEmitter<void> = new EventEmitter<void>();

  public popupVisible = false;

  addHotelForm = this.formBuilder.group({
    hotelName: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(255)]
      // Введите название длиной от 5 до 255 символов
    ]
  });

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

  constructor(
    private hotelDataService: HotelDataService,
    private formBuilder: FormBuilder
  ) {}

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
      console.log("loaded hotels: " + hotelItems.length);
      this.config = {
        ...this.configTemplate,
        items: hotelItems
      };
    });
  }

  public openPopup(): void {
    this.popupVisible = true;
  }

  public closePopup(): void {
    this.popupVisible = false;
  }

  public addHotel(): void {
    const hotelName = this.addHotelForm.value.hotelName;
    console.log(hotelName);
    this.hotelDataService.addHotel(hotelName).subscribe(res => {
      this.addedEvent.emit();      
      this.closePopup();
      this.loadHotels();
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
