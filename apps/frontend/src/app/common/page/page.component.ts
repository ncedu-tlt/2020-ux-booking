import { Component, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'b-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.less']
})
export class PageComponent {
  constructor(private http: HttpClient) {}
  getMainForm(): Observable<[]> {
    return this.http.get<[]>('/api/main-info-form');
  }
}
