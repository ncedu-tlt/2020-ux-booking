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
import { PageTitleComponent } from './page-title/page-title.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BannerComponent } from './banner/banner.component';
import { LinkComponent } from './link/link.component';
import { HotelCardComponent } from './hotel-card/hotel-card.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SelectorComponent } from './selector/selector.component';
import { FileSelectorComponent } from './file-selector/file-selector.component';
import { TableComponent } from './table/table.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { AppRoutingModule } from '../app-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { RouterModule } from '@angular/router';
import { BackgroundSvgComponent } from './background-page/background-svg.component';
import { ListOfHotelsComponent } from './admin-tool/list-of-hotels/list-of-hotels.component';
import { HotelCreationPopupComponent } from './admin-tool/hotel-creation-popup/hotel-creation-popup.component';
import { ListOfUsersComponent } from './admin-tool/user-listing-page/user-listing-page.component';
import { HotelPageComponent } from './admin-tool/hotel-page/hotel-page.component';
import { MainInfoComponent } from './admin-tool/main-info/main-info/main-info.component';
import { MainComponent } from './main/main.component';
import { FormSavingPhotosComponent } from './form-saving-photos/form-saving-photos.component';

@NgModule({
  imports: [
    NgCommonModule,
    AngularSvgIconModule,
    I18NextModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    FormsModule
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
    TableComponent,
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
    BackgroundSvgComponent,
    RegistrationComponent,
    ListOfHotelsComponent,
    HotelCreationPopupComponent,
    ListOfUsersComponent,
    SelectorComponent,
    FileSelectorComponent,
    TextAreaComponent,
    HotelPageComponent,
    MainInfoComponent,
    MainComponent,
    FormSavingPhotosComponent
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
    TableComponent,
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
    BackgroundSvgComponent,
    RegistrationComponent,
    ListOfHotelsComponent,
    HotelCreationPopupComponent,
    ListOfUsersComponent,
    SelectorComponent,
    FileSelectorComponent,
    TextAreaComponent,
    HotelPageComponent,
    MainInfoComponent,
    MainComponent,
    FormSavingPhotosComponent
  ]
})
export class CommonModule {}
