import { Component, OnInit } from '@angular/core';
import { TabModel } from '../../../models/tab.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'b-hotel-page',
  templateUrl: './hotel-page.component.html',
  styleUrls: ['./hotel-page.component.less']
})
export class HotelPageComponent implements OnInit {
  tabs: TabModel[] = [];
  id: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.tabs = [
      {
        name: 'tabs',
        url: '/admin-tool/hotel/' + this.id + '/main-info'
      }
    ];
  }
}
