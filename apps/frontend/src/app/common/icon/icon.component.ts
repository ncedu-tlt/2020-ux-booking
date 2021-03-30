import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'b-button',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
  @Input()
  type: 'primary' | 'flat' = 'primary';

  @Input()
  buttonType: 'button' | 'reset' | 'submit' = 'button';
  @Input()
  hasIcon = false;
  @Input()
  isDisabled = true;
}
