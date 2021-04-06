import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'b-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.less']
})
export class StepperComponent {
  @Input()
  steps: string[] = [];

  @Input()
  set activeStep(step: number) {
    this._activeStep = step;
  }

  @Output()
  stepChange: EventEmitter<number> = new EventEmitter<number>();

  passed = true;

  _activeStep = 1;

  changeStep(index: number): void {
    if (index < this._activeStep) {
      this.stepChange.emit(index);
    }
  }

  getStepClass(index): string {
    if (this._activeStep == index) {
      this.passed = false;
      return '_active';
    } else if (this._activeStep > index) {
      this.passed = true;
      return '_passed';
    } else {
      this.passed = false;
      return '_disabled';
    }
  }
}
