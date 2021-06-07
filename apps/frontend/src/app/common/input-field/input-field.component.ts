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
  placeholder = '';
  @Input()
  isMandatory: boolean;
  @Input()
  isDisabled: boolean;
  @Input()
  simpleStyle: boolean;
  @Input()
  ngModel = '';

  @Output() handleChange: EventEmitter<string> = new EventEmitter();

  input: FormControl;

  ngOnInit(): void {
    this.input = new FormControl(this.ngModel, Validators.required);
    if (this.isDisabled) {
      this.input.disable();
    }
    this.input.valueChanges.subscribe((value: string) => {
      this.handleChange.emit(value);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.isDisabled?.currentValue != undefined) {
      this.isDisabled ? this.input?.disable() : this.input?.enable();
    }

    if (changes?.value?.currentValue != undefined) {
      this.input?.setValue(this.ngModel);
    }
  }
}
