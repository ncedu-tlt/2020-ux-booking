import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor(private http: HttpClient) {}

  getUser(id: string): Observable<UserModel> {
    return this.http.get<UserModel>('/api/users/' + id);
  }

  updateUserInfo(user: UserModel): Observable<any> {
    return this.http.patch('/api/users/' + user.id, user);
  }
}
