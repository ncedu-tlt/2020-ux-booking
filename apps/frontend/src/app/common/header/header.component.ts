import { Component, Inject, Input } from '@angular/core';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'b-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  @Input()
  isAdmin = true;

  @Input()
  userName = '';

  @Input()
  isHiddenLoginButton = false;

  isLanguageRu = true;

  isNightTheme = true;

  isShowBurgerIcon = true;

  isHiddenModal = false;

  isShowMenu = false;

  private _language: string;

  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
    private cookieService: CookieService
  ) {
    this.language = i18NextService.language;
    if (this.language == 'en') {
      this.isLanguageRu = false;
    }
  }

  get language(): string {
    return this._language;
  }

  set language(value: string) {
    if (this._language) {
      this.setLanguage(value);
    }
    this._language = value;
  }

  private async setLanguage(lang: string): Promise<void> {
    await this.i18NextService.changeLanguage(lang);
    this.cookieService.set('lang', lang);
    window.location.reload();
  }

  showModal(): void {
    this.isShowBurgerIcon = !this.isShowBurgerIcon;
    this.isHiddenModal = !this.isHiddenModal;
  }

  changeLanguage(lang: string): void {
    this.language = lang;
  }

  changeNight(): void {
    this.isNightTheme = !this.isNightTheme;
  }

  toggleMenu(): void {
    this.isShowMenu = !this.isShowMenu;
  }
}
