import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '@booking/models/user.dto';
import { Observable } from 'rxjs';

@Injectable()
export class UserDataService {
  constructor(private http: HttpClient) {}

  getUsers(filter?: any): Observable<UserDto[]> {
    const params = new HttpParams({
      fromObject: filter
    });
    return this.http.get<UserDto[]>('/api/users', { params: params });
  }

  deleteUser(id: string): Observable<UserDto> {
    return this.http.delete<UserDto>('/api/users/' + id);
  }
}
