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

  addHotel(name: string): Observable<HotelDto> {
    return this.http.post<HotelDto>('http://localhost:3333/api/hotels/', { name: name });
  }

}
