import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { StepperComponent } from './stepper/stepper.component';
import { NotificationComponent } from './notification/notification.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TabsComponent } from './tabs/tabs.component';
import { HeaderComponent } from './header/header.component';
import { I18NextModule } from 'angular-i18next';
import { StarSelectorComponent } from './star-selector/star-selector.component';
import { ButtonIconComponent } from './icon/button-icon.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LinkComponent } from './link/link.component';
import { HotelCardComponent } from './hotel-card/hotel-card.component';

@NgModule({
  imports: [
    NgCommonModule,
    AngularSvgIconModule,
    I18NextModule,
    ReactiveFormsModule
  ],
  declarations: [
    ButtonComponent,
    StepperComponent,
    NotificationComponent,
    TabsComponent,
    DropdownComponent,
    HeaderComponent,
    StarSelectorComponent,
    HotelCardComponent,
    ButtonIconComponent,
    LinkComponent,
    InputFieldComponent
  ],
  exports: [
    ButtonComponent,
    StepperComponent,
    NotificationComponent,
    TabsComponent,
    DropdownComponent,
    HeaderComponent,
    StarSelectorComponent,
    ButtonIconComponent,
    LinkComponent,
    HotelCardComponent,
    InputFieldComponent
  ]
})
export class CommonModule {}
