import { Component, Inject, OnInit } from '@angular/core';
import { TabModel } from '../../../models/tab.model';
import { ActivatedRoute } from '@angular/router';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { HotelDataService } from '../../../services/hotel-data.service';
import { HotelDto } from '@booking/models/hotel.dto';

@Component({
  selector: 'b-hotel-page',
  templateUrl: './hotel-page.component.html',
  styleUrls: ['./hotel-page.component.less']
})
export class HotelPageComponent implements OnInit {
  tabs: TabModel[] = [];
  id: string;
  public nameId: string;
  public name: string;

  constructor(
    private route: ActivatedRoute,
    private hotelDataService: HotelDataService,

    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.tabs = [
      {
        name: this.i18NextService.t('adminTool.hotelForm.mainInfo.title'),
        url: '/admin-tool/hotel/' + this.id + '/main-info'
      },
      {
        name: this.i18NextService.t('savePhotoComponent.title'),
        url: '/admin-tool/hotel/' + this.id + '/photos'
      }
    ];
    this.route.params.subscribe(params => {
      this.nameId = params?.id || '';
      this.hotelDataService
        .getNameById(this.nameId)
        .subscribe((nameId: string) => {
          this.name = nameId;
        });
    });
  }
}
