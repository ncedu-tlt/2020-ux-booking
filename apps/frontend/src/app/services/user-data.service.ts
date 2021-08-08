import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '@booking/models/user.dto';
import { Observable } from 'rxjs';

@Injectable()
export class UserDataService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>('/api/users');
  }

  deleteUser(id: string): Observable<UserDto> {
    return this.http.delete<UserDto>('/api/users/' + id);
  }
}
