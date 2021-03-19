import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';

@NgModule({
  imports: [NgCommonModule],
  declarations: [ButtonComponent],
  exports: [ButtonComponent]
})
export class CommonModule {}
