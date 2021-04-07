import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'b-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent {
  @Input()
  type: 'checked' | 'default' = 'default';
  @Input()
  typeEdit: 'not-edit' | 'default' = 'default';
  @Input()
  label: string;
}
