import { Component, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TabModel } from '../../models/tab.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'b-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.less']
})
export class PageComponent {
  tabs: TabModel[] = [];
  id: string;
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  getMainForm(): Observable<[]> {
    return this.http.get<[]>('/api/main-info-form');
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.tabs = [
      {
        name: 'tabs',
        url: '/admin-tool/hotel/' + this.id + '/main-info'
      },
      {
        name: 'distance',
        url: '/admin-tool/hotel/' + this.id + '/distance'
      }
    ];
  }
}
