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
import { BannerComponent } from './banner/banner.component';
import { LinkComponent } from './link/link.component';
import { HotelCardComponent } from './hotel-card/hotel-card.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SelectorComponent } from './selector/selector.component';
import { FileSelectorComponent } from './file-selector/file-selector.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { AppRoutingModule } from '../app-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    NgCommonModule,
    AngularSvgIconModule,
    I18NextModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    ButtonComponent,
    StepperComponent,
    NotificationComponent,
    TabsComponent,
    DropdownComponent,
    HeaderComponent,
    StarSelectorComponent,
    PageTitleComponent,
    BannerComponent,
    HotelCardComponent,
    ButtonIconComponent,
    LinkComponent,
    InputFieldComponent,
    InputFieldComponent,
    CheckboxComponent,
    SelectorComponent,
    AuthorizationComponent,
    RegistrationComponent,
    SelectorComponent,
    FileSelectorComponent
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
    PageTitleComponent,
    BannerComponent,
    LinkComponent,
    HotelCardComponent,
    InputFieldComponent,
    CheckboxComponent,
    SelectorComponent,
    InputFieldComponent,
    AppRoutingModule,
    AuthorizationComponent,
    RegistrationComponent,
    SelectorComponent,
    FileSelectorComponent
  ]
})
export class CommonModule {}
