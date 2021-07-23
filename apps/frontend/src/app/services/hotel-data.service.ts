import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HotelInfoModel } from '../models/hotel-Info.model';
import { HotelDto } from '@booking/models/hotel.dto';

@Injectable()
export class HotelDataService {
  constructor(private http: HttpClient) {}

  getHotels(): Observable<HotelInfoModel[]> {
    return this.http.get<HotelInfoModel[]>('/api/hotels');
  }

  getHotel(id): Observable<HotelDto> {
    return this.http.get<HotelDto>('http://localhost:3333/api/hotels/' + id);
  }

  postHotelRooms(api, rooms) {
    return this.http.post(api, rooms);
  }
}
