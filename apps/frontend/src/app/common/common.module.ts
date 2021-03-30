import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { StepperComponent } from './stepper/stepper.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  imports: [NgCommonModule, AngularSvgIconModule],
  declarations: [ButtonComponent, StepperComponent, NotificationComponent],
  exports: [ButtonComponent, StepperComponent, NotificationComponent]
})
export class CommonModule {}
