import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';

@Component({
  selector: 'b-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFieldComponent
  implements OnInit, ControlValueAccessor, Validator {
  @Input()
  title: string;
  @Input()
  placeholder: string;
  @Input()
  isMandatory: boolean;
  @Input()
  isDisabled: boolean;

  @Output() handleChange: EventEmitter<string> = new EventEmitter();

  touched = false;
  disabled = false;
  _value = '';
  input: FormControl;

  validate(control: AbstractControl): ValidationErrors | null {
    const quantity = control.value;
    if (quantity <= 0) {
      return {
        mustBePositive: {
          quantity
        }
      };
    }
  }

  registerOnChange(fn: string): void {
    //
  }

  registerOnTouched(fn: string): void {
    //
  }

  writeValue(obj: string): void {
    //
  }

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
