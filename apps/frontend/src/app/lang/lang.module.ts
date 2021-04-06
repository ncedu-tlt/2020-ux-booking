import { NgModule } from '@angular/core';
import { LangSelectorComponent } from './lang-selector/lang-selector.component';
import { CommonModule } from '@angular/common';
import { I18NextModule } from 'angular-i18next';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, I18NextModule, FormsModule],
  exports: [LangSelectorComponent],
  declarations: [LangSelectorComponent],
  providers: [CookieService]
})
export class LangModule {}
