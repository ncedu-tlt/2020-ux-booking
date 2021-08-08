import { Component, Inject, OnInit } from '@angular/core';
import { I18NextPipe } from '../../stories.helpers';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';

@Component({
  selector: 'b-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {
  tabs: { url: string; name: string }[];

  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService
  ) {}

  ngOnInit(): void {
    this.tabs = [
      {
        name: this.i18NextService.t('user-profile.tabs.booked-hotels'),
        url: '#'
      },
      {
        name: this.i18NextService.t('user-profile.tabs.booking-history'),
        url: '#'
      },
      { name: this.i18NextService.t('user-profile.tabs.bookmarks'), url: '#' },
      {
        name: this.i18NextService.t('user-profile.tabs.personal-data'),
        url: 'person'
      },
      {
        name: this.i18NextService.t('user-profile.tabs.security-settings'),
        url: '#'
      }
    ];
  }
}
