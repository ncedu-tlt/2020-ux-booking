import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'b-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent {
  @Input()
  checked = false;
  @Input()
  disabled = false;
  @Input()
  label: string;

  getDisabledStatus(): string {
    return this.disabled ? 'disabled' : 'default';
  }
  getCheckedStatus(): string {
    return this.checked ? 'checked' : 'default';
  }
}
