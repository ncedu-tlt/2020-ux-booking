import { Component, Input, Output } from '@angular/core';
import { step1Model } from '../../models/step1.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'b-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.less']
})
export class Step1Component {
  @Input()
  step1Model: step1Model;
  @Input()
  type;
  @Input()
  items;
  @Input()
  selectedItem;
  @Input()
  activeItem;
  @Input()
  isLeftAligned;
  @Output()
  stateChange;
  @Output()
  selectedItemEvent;
  @Input()
  text;
  @Input()
  label;
  @Input()
  isChecked;
  @Input()
  isDisabled;
  @Input()
  value: string;
  public formG: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formG = fb.group({
      textarea: ''
    });
  }
  ngOnInit(): void {
    this.formG.valueChanges.subscribe(value => {
      console.log('value', value);
    });
  }
}
