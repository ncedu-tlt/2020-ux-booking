import { Component, Input, Output } from '@angular/core';
import { step1Model } from '../../models/step1.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'b-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.less']
})
export class PageComponent {
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
}
