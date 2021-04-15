import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'b-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input()
  type: 'primary' | 'secondary' | 'flat' | 'action' = 'primary';

  @Input()
  buttonType: 'button' | 'reset' | 'submit' = 'button';
  @Input()
  hasIcon = false;
  @Input()
  size: 'default' | 'small' = 'default';
  @Input()
  text: string;
  @Input()
  isDisabled = false;
}
