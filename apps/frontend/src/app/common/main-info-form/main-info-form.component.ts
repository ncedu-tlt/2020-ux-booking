import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HotelInfoModel } from '../../models/hotel-Info.model';
import { HotelDataService } from '../../services/hotel-data.service';
@Component({
  selector: 'b-main-info-form',
  templateUrl: './main-info-form.component.html',
  styleUrls: ['./main-info-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainInfoFormComponent {
  @Input()
  value: string;
  public formG: FormGroup;
  constructor(
    private fb: FormBuilder,
    private hotelDataService: HotelDataService
  ) {
    this.formG = fb.group({
      textarea: '',
      name: '',
      serviceType: '',
      country: '',
      address: '',
      description: '',
      paymentMethod: '',
      city: '',
      starClassification: '',
      currency: '',
      checkbox: ''
    });
  }
  ngOnInit(): void {
    this.fb.group(FormGroup);
    this.formG.valueChanges.subscribe(value => {
      console.log('value', value);
    });
    this.hotelDataService.postHotelsById();
  }
  setStar(stars: number): void {
    this.formG.patchValue({
      starClassification: stars
    });
  }

}
