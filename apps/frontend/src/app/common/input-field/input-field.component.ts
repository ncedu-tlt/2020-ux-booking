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
  @Input()
  title: string;
  @Input()
  placeholder: string;
  @Input()
  isMandatory: boolean;
  @Input()
  isDisabled: boolean;

  @Output() handleChange: EventEmitter<string> = new EventEmitter();

  _value = '';
  input: FormControl;

  ngOnInit(): void {
    this.input = new FormControl(this._value, Validators.required);
    if (this.isDisabled) {
      this.input.disable();
    }
    this.input.valueChanges.subscribe((value: string) => {
      this.handleChange.emit(value);
    });
  }
}
