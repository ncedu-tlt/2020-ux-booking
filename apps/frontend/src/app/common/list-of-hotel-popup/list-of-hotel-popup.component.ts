import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HotelDataService } from '../../services/hotel-data.service';

@Component({
  selector: 'b-list-of-hotel-popup',
  templateUrl: './list-of-hotel-popup.component.html',
  styleUrls: ['./list-of-hotel-popup.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListOfHotelPopupComponent {
  @Input()
  title: string;

  @Output()
  addedEvent: EventEmitter<void> = new EventEmitter<void>();

  public popupVisible = true;

  public openPopup(): void {
    this.popupVisible = true;
  }

  public closePopup(): void {
    this.popupVisible = false;
  }

  constructor(private hotelDataService: HotelDataService, private formBuilder: FormBuilder) {}

  public addHotel(): void {
    const hotelName = this.formReview.value.hotelName;
    console.log(hotelName);
    this.hotelDataService.addHotel(hotelName).subscribe(res => {
      this.addedEvent.emit();
      this.closePopup();
    });
  }

  formReview = this.formBuilder.group({
    hotelName: [
      '',
      [Validators.required, Validators.maxLength(255)]
    ]
  });


}
