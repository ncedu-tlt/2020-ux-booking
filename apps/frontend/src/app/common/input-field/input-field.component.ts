import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'b-button',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFieldComponent {
  value = '';
  isField = true;
  counterChange = 0;
  @Input()
  title;
  placeholder;
  isMandatory;
  isDisabled;

  handleChange(event) {
    this.value = event.target.value;
    this.value.length === 0 ? (this.isField = false) : (this.isField = true);
    this.counterChange++;
  }

  getExtraClass(): string {
    if ((this.isField && this.isMandatory) || this.counterChange === 0)
      return 'default';
    else return 'red';
  }
}
