import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'b-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent {
  @Input()
  label: string;
  @Input()
  isChecked: boolean;
  @Input()
  isDisabled: boolean;
}
