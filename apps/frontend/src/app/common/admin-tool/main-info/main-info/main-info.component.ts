import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelDto } from '@booking/models/hotel.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelDataService } from '../../../../services/hotel-data.service';

@Component({
  selector: 'b-main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class MainInfoComponent implements OnInit {
  @HostBinding('class.main-info') mainInfo = true;
  @Input()
  value: string;

  public formG: FormGroup;
  public pageForm: HotelDto;
  public formId: string;
  public id: string;
  public listService = ['Длительного проживания', 'Бюджетный'];
  public listPaymentMethod = ['Наличные', 'Банковская карта'];
  constructor(
    private fb: FormBuilder,
    private hotelDataService: HotelDataService,
    private route: ActivatedRoute
  ) {
    this.formG = fb.group({
      textarea: '',
      name: ['', [Validators.required]],
      serviceType: '',
      country: ['', [Validators.required]],
      street: ['', [Validators.required]],
      houseNumber: ['', [Validators.required]],
      description: '',
      bookingPolicy: '',
      city: ['', [Validators.required]],
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
    this.route.parent.params.subscribe(params => {
      this.formId = params?.id || '';
      this.hotelDataService
        .getHotelsById(this.formId)
        .subscribe((formId: HotelDto) => {
          this.pageForm = formId;
          this.formG.patchValue({
            textarea: this.pageForm.description,
            name: this.pageForm.name,
            serviceType: this.pageForm.serviceType,
            bookingPolicy: this.pageForm.bookingPolicy,
            country: this.pageForm.address.country,
            street: this.pageForm.address.street,
            houseNumber: this.pageForm.address.number,
            city: this.pageForm.address.city,
            starClassification: this.pageForm.stars,
            currency: this.pageForm.currency?.name,
            checkbox: this.pageForm.freeCancellation
          });
        });
    });
  }
  changeHotelMainInfo() {
    this.pageForm.description = this.formG.get('textarea').value;
    this.pageForm.name = this.formG.get('name').value;
    this.pageForm.serviceType = this.formG.get('serviceType').value;
    this.pageForm.address.country = this.formG.get('country').value;
    this.pageForm.address.street = this.formG.get('street').value;
    this.pageForm.address.number = this.formG.get('houseNumber').value;
    this.pageForm.address.city = this.formG.get('city').value;
    this.pageForm.stars = this.formG.get('starClassification').value;
    this.pageForm.currency = {
      name: this.formG.get('currency').value
    };
    this.pageForm.freeCancellation = this.formG.get('checkbox').value;
    this.pageForm.bookingPolicy =
      this.formG.get('bookingPolicy').value &&
      this.formG.get('bookingPolicy').value[0];
    this.pageForm.serviceType = {
      name:
        this.formG.get('serviceType').value &&
        this.formG.get('serviceType').value[0]
    };
    this.hotelDataService
      .patchChangeHotelMainInfo(this.formId, this.pageForm)
      .subscribe((pageForm: HotelDto) => {
        this.pageForm = pageForm;
      });
  }

  setStar(stars: number): void {
    this.formG.patchValue({
      starClassification: stars
    });
  }
  getStar(): number {
    return this.formG.get('starClassification').value;
  }

  setDropdownService(items: string[]): void {
    this.formG.patchValue({
      serviceType: items
    });
  }
  setDropdownPayment(items: string[]): void {
    this.formG.patchValue({
      paymentMethod: items
    });
  }
}
