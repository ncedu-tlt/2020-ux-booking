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
    return this.http.get<HotelDto>('/api/hotels/' + id);
  }

  addHotel(name: string): Observable<HotelDto> {
    return this.http.post<HotelDto>('/api/hotels/', {
      name: name
    });
  }

  deleteHotel(id: string): Observable<HotelDto> {
    return this.http.delete<HotelDto>('/api/hotels/' + id);
  }
}
