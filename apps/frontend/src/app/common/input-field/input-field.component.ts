import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnInit
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';

@Component({
  selector: 'b-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    }
  ]
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

  touched = false;
  disabled = false;
  input: FormControl = new FormControl();
  onChange;
  onTouched = () => {
    //
  };

  validate(control: AbstractControl): ValidationErrors | null {
    const quantity = control.value;
    console.log(quantity);
    if (quantity <= 0) {
      return {
        mustBePositive: {
          quantity
        }
      };
    }
  }

  writeValue(value: string): void {
    this.input.setValue(value);
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  ngOnInit(): void {
    if (this.isDisabled) {
      this.input.disable();
    }
    this.input.valueChanges.subscribe((val: string) => {
      if (this.onChange) {
        this.onChange(val);
      }
    });
  }
}
