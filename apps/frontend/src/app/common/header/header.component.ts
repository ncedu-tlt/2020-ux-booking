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
  isLanguageRu = true;

  @Input()
  isNightTheme = true;

  @Input()
  isShowBurgerIcon = true;

  @Input()
  isHiddenLogo = false;

  @Input()
  isShowHeader = false;

  @Input()
  isAdmin = true;

  @Input()
  isShowMenu = false;

  @Input()
  userName = 'Иван И.';

  showModal(): void {
    this.isShowBurgerIcon = !this.isShowBurgerIcon;
    this.isShowHeader = !this.isShowHeader;
    this.isHiddenLogo = !this.isHiddenLogo;
  }

  changeLanguage(): void {
    this.isLanguageRu = !this.isLanguageRu;
  }

  changeNight(): void {
    this.isNightTheme = !this.isNightTheme;
  }

  visibleMenu(): void {
    this.isShowMenu = !this.isShowMenu;
  }
}
