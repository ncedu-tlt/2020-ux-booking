import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'b-test',
  template: `Main Page `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {}
