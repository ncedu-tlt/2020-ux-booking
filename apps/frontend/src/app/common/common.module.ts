import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NotificationComponent } from './notification/notification.component';
import { IconComponent } from './icon/icon.component';

@NgModule({
  imports: [NgCommonModule, AngularSvgIconModule],
  declarations: [ButtonComponent, NotificationComponent, IconComponent],
  exports: [ButtonComponent, NotificationComponent, IconComponent]
})
export class CommonModule {}
