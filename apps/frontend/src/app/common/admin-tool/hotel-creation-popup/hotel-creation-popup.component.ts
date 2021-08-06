import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotelDataService } from '../../../services/hotel-data.service';

@Component({
  selector: 'b-hotel-creation-popup',
  templateUrl: './hotel-creation-popup.component.html',
  styleUrls: ['./hotel-creation-popup.component.less']
})
export class HotelCreationPopupComponent {
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
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  public openPopup(): void {
    this.popupVisible = true;
  }

  public closePopup(): void {
    this.popupVisible = false;
    this.addHotelForm.reset();
  }

  public addHotel(): void {
    const hotelName: string = this.addHotelForm.value.hotelName;
    this.hotelDataService.addHotel(hotelName).subscribe(res => {
      this.addedEvent.emit();
      this.closePopup();
      this.router.navigate(['/admin-tool/hotel/', res.id]);
    });
  }
}
