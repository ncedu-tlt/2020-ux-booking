import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HotelInfoModel } from '../models/hotel-Info.model';
import { stepModel } from '../models/step1.model';

@Injectable()
export class HotelDataService {
  constructor(private http: HttpClient) {}

  getHotels(): Observable<HotelInfoModel[]> {
    return this.http.get<HotelInfoModel[]>('/api/hotels');
  }
  postHotelsById(): Observable<stepModel> {
    return this.http.post<stepModel>('/api/hotels' + id );
  }
}
