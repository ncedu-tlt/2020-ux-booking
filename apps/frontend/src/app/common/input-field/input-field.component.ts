import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'b-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFieldComponent implements OnInit {
  _value = '';
  input: FormControl;
  @Input()
  title;
  @Input()
  placeholder;
  @Input()
  isMandatory;
  @Input()
  isDisabled;

  @Output() handleChange: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.input = new FormControl(this._value, Validators.required);
    this.input.valueChanges.subscribe((value: string) => {
      this.handleChange.emit(value);
    });
  }
}
