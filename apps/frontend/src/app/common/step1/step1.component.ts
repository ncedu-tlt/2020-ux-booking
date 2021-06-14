import { Component, Inject, Input, Output } from '@angular/core';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { CookieService } from 'ngx-cookie-service';
import { step1Model } from '../../models/step1.model';

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
}
