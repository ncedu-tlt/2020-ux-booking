import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'b-file-area',
  templateUrl: './field-area.component.html',
  styleUrls: ['./field-area.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldAreaComponent {
  public textarea = new FormControl('');
  public formG = new FormGroup({ description: this.textarea });

  @Input()
  title: string;
  @Input()
  placeholder: string;
  @Input()
  isMandatory: boolean;
  @Input()
  isDisabled: boolean;
}
