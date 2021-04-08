import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { StepperComponent } from './stepper/stepper.component';
import { NotificationComponent } from './notification/notification.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { HeaderComponent } from './header/header.component';
import { I18NextModule } from 'angular-i18next';
import { StarSelectorComponent } from './star-selector/star-selector.component';

@NgModule({
  imports: [NgCommonModule, AngularSvgIconModule, I18NextModule],
  declarations: [
    ButtonComponent,
    StepperComponent,
    NotificationComponent,
    DropdownComponent,
    HeaderComponent,
    StarSelectorComponent
  ],
  exports: [
    ButtonComponent,
    StepperComponent,
    NotificationComponent,
    DropdownComponent,
    HeaderComponent,
    StarSelectorComponent
  ]
})
export class CommonModule {}
