import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HotelInfoModel } from '../models/hotel-Info.model';
import { HotelDto } from '@booking/models/hotel.dto';
import { RoomDto } from '@booking/models/room.dto';

@Injectable()
export class HotelDataService {
  constructor(private http: HttpClient) {}

  getHotels(): Observable<HotelInfoModel[]> {
    return this.http.get<HotelInfoModel[]>('/api/hotels');
  }

  getHotel(id): Observable<HotelDto> {
    return this.http.get<HotelDto>('/api/hotels/' + id);
  }

  getRoom(API): Observable<HotelDto> {
    return this.http.get<HotelDto>(API);
  }

  addHotel(name: string): Observable<HotelDto> {
    return this.http.post<HotelDto>('/api/hotels/', {
      name: name
    });
  }

  deleteHotel(id: string): Observable<HotelDto> {
    return this.http.delete<HotelDto>('/api/hotels/' + id);
  }

  postHotelRooms(api, rooms) {
    return this.http.post(api, rooms);
  }

  getHotelRooms(id): Observable<RoomDto> {
    return this.http.get('/api/hotels/' + id + '/rooms', {
      headers: {
        range: ['0'],
        take: '100'
      }
    });
  }

  deleteHotelRoom(idHotel, idRoom) {
    return this.http.delete('/api/hotels/' + idHotel + '/rooms/' + idRoom);
  }
}
