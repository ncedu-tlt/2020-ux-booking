import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
@Component({
  selector: 'b-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true
    }
  ]
})
export class TextAreaComponent implements ControlValueAccessor {
  @Input()
  title: string;
  @Input()
  placeholder: string;
  @Input()
  isMandatory: boolean;
  @Input()
  isDisabled: boolean;
  @Input()
  value: string;
  public formG: FormGroup;
  onChange(_: any) {
    //onChange
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched() {
    //registerOnTouched
  }
  changeValue($event: Event) {
    this.value = ($event.target as HTMLTextAreaElement).value;
    this.onChange(this.value);
    console.log($event);
  }
}