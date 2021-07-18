import { Component, Inject, OnInit } from '@angular/core';
import { TabModel } from '../../../models/tab.model';
import { ActivatedRoute } from '@angular/router';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';

@Component({
  selector: 'b-hotel-page',
  templateUrl: './hotel-page.component.html',
  styleUrls: ['./hotel-page.component.less']
})
export class HotelPageComponent implements OnInit {
  tabs: TabModel[] = [];
  id: string;

  constructor(
    private route: ActivatedRoute,
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.tabs = [
      {
        name: 'tabs',
        url: '/admin-tool/hotel/' + this.id + '/main-info'
      },
      {
        name: this.i18NextService.t('savePhotoComponent.title'),
        url: '/admin-tool/hotel/' + this.id + '/photos'
      },
      {
        name: 'add-room',
        url: '/admin-tool/hotel/' + this.id + '/add-room'
      }
    ];
  }
}
