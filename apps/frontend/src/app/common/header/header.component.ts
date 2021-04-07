import { Component, Input } from '@angular/core';

@Component({
  selector: 'b-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  @Input()
  isEnterTrue = true;

  @Input()
  isAdmin = true;

  @Input()
  userName = '11';

  isLanguageRu = true;

  isNightTheme = true;

  isShowBurgerIcon = true;

  isHiddenLogo = false;

  isShowHeader = false;

  isShowMenu = false;

  private _language: string;

  /*constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
    private cookieService: CookieService
  ) {
    this.language = i18NextService.language;
  }*/

  get language(): string {
    return this._language;
  }

  set language(value: string) {
    if (this._language) {
      /*this.changeLang(value);*/
    }
    this._language = value;
  }

  showModal(): void {
    this.isShowBurgerIcon = !this.isShowBurgerIcon;
    this.isShowHeader = !this.isShowHeader;
    this.isHiddenLogo = !this.isHiddenLogo;
  }

  changeLanguage(lang: string): void {
    this.language = lang;
    this.isLanguageRu = !this.isLanguageRu;
  }

  changeNight(): void {
    this.isNightTheme = !this.isNightTheme;
  }

  toggleMenu(): void {
    this.isShowMenu = !this.isShowMenu;
  }
}
