import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'b-background-svg',
  templateUrl: './background-svg.component.html',
  styleUrls: ['./background-svg.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundSvgComponent {}
