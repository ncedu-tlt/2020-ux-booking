import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'b-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFieldComponent {
  @Input()
  text: string;
  @Input()
  icon: boolean;
  @Input()
  uploadPhoto: string;
}
