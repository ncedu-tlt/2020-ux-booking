import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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

  constructor(private cdr: ChangeDetectorRef) {}
  onChange(value: any) {
    //onChange
  }

  writeValue(value: any) {
    this.value = value;
    this.cdr.markForCheck();
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
  }
}
