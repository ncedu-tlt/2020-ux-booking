import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'b-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTitleComponent {
  @Input()
  title: string;
}
