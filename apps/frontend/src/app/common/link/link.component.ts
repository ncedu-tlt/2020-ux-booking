import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'b-button',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent {
  @Input()
  href: string;
  @Input()
  text: string;
}
