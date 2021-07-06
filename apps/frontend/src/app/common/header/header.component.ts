import { Component, Inject, Input, OnInit } from '@angular/core';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'b-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Input()
  isAdmin = true;

  userName = '';

  isHiddenLoginButton = false;

  isLanguageRu = true;

  isNightTheme = true;

  isShowBurgerIcon = true;

  isHiddenModal = false;

  isShowMenu = false;

  currentUrl: string;

  private _language: string;

  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
    private cookieService: CookieService,
    private location: Location,
    private userService: UserService
  ) {
    this.language = i18NextService.language;
    if (this.language == 'en') {
      this.isLanguageRu = false;
    }
    this.userService.getUser().subscribe((user: any) => {
      this.userName = user;
    });
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

  logOut(): void {
    this.userName = '';
    this.userService.deleteUser();
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(name => {
      this.userName = name;
    });
    this.currentUrl = this.location.path();
    this.isHiddenLoginButton = !(
      this.location.path() === '/registration' ||
      this.location.path() === '/authorization'
    );
  }
}
