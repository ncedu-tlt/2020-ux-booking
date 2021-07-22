import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HotelDataService } from '../../services/hotel-data.service';

@Component({
  selector: 'b-list-of-hotel-popup',
  templateUrl: './list-of-hotel-popup.component.html',
  styleUrls: ['./list-of-hotel-popup.component.less'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ListOfHotelPopupComponent {
  @Output()
  addedEvent: EventEmitter<void> = new EventEmitter<void>();

  public popupVisible = false;

  addHotelForm = this.formBuilder.group({
    hotelName: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(255)]
    ]
  });

  constructor(
    private hotelDataService: HotelDataService,
    private formBuilder: FormBuilder
  ) {}

  public openPopup(): void {
    this.popupVisible = true;
  }

  public closePopup(): void {
    this.popupVisible = false;
  }

  public addHotel(): void {
    if (!(this.addHotelForm.dirty && this.addHotelForm.valid)) return;
    const hotelName: string = this.addHotelForm.value.hotelName;
    this.hotelDataService.addHotel(hotelName).subscribe(res => {
      this.addedEvent.emit();
      this.closePopup();
    });
  }
}
