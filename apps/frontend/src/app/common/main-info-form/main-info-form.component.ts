import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'b-main-info-form',
  templateUrl: './main-info-form.component.html',
  styleUrls: ['./main-info-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainInfoFormComponent {
  @Input()
  title: string;
  @Input()
  placeholder: string;
  @Input()
  isMandatory: boolean;
  @Input()
  isDisabled: boolean;
  @Input()
  value: string;
  public formG: FormGroup;
  constructor(private fb: FormBuilder) {
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
    this.formG.valueChanges.subscribe(value => {
      console.log('value', value);
    });
  }
}
