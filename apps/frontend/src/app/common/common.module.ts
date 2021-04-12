import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { StepperComponent } from './stepper/stepper.component';
import { NotificationComponent } from './notification/notification.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ButtonIconComponent } from './icon/button-icon.component';

@NgModule({
  imports: [NgCommonModule, AngularSvgIconModule],
  declarations: [
    ButtonComponent,
    StepperComponent,
    NotificationComponent,
    DropdownComponent,
    ButtonIconComponent
  ],
  exports: [
    ButtonComponent,
    StepperComponent,
    NotificationComponent,
    DropdownComponent,
    ButtonIconComponent
  ]
})
export class CommonModule {}
