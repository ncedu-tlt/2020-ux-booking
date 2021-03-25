import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SelectorComponent } from './selector/selector.component';

@NgModule({
  imports: [NgCommonModule, AngularSvgIconModule],
  declarations: [ButtonComponent, SelectorComponent],
  exports: [ButtonComponent]
})
export class CommonModule {}
