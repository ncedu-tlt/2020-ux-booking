import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'b-distance-form',
  templateUrl: './distance-form.component.html',
  styleUrls: ['./distance-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DistanceFormComponent {

}
