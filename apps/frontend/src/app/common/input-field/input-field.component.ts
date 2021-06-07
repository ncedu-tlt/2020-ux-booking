import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges
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
  @Input()
  simpleStyle: boolean;
  @Input()
  value = '';

  @Output() handleChange: EventEmitter<string> = new EventEmitter();

  input: FormControl;

  ngOnInit(): void {
    this.input = new FormControl(this.value, Validators.required);
    if (this.isDisabled) {
      this.input.disable();
    }
    this.input.valueChanges.subscribe((value: string) => {
      this.handleChange.emit(value);
    });
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   changes?.isDisabled.currentValue
  //     ? this.input?.disable()
  //     : this.input?.enable();
  // }
}
