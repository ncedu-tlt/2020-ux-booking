import { Component, Inject } from '@angular/core';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { languages } from '../../i18n/i18next';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'b-lang-selector',
  templateUrl: './lang-selector.component.html'
})
export class LangSelectorComponent {
  readonly languages = languages;

  private _current: string;

  get current(): string {
    return this._current;
  }

  set current(value: string) {
    if (this._current) {
      this.changeLanguage(value);
    }
    this._current = value;
  }

  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
    private cookieService: CookieService
  ) {
    this.current = i18NextService.language;
  }

  private async changeLanguage(lang: string): Promise<void> {
    await this.i18NextService.changeLanguage(lang);
    this.cookieService.set('lang', lang);
    window.location.reload();
  }
}
