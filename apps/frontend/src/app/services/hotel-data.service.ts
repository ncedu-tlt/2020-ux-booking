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
  getHotelsById(id: string): Observable<HotelDto> {
    return this.http.get<HotelDto>('/api/hotels/' + id);
  }
  patchChangeHotelMainInfo(body: HotelDto): Observable<HotelDto> {
    return this.http.patch<HotelDto>(':id/mainInfo', body);
  }
  getHotelNameId(id: string): Observable<string> {
    return this.http.get<string>('/api/hotels/' + id);
  }
}
