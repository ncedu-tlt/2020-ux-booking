import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [NgCommonModule, AngularSvgIconModule],
  declarations: [ButtonComponent],
  exports: [ButtonComponent]
})
export class CommonModule {}
