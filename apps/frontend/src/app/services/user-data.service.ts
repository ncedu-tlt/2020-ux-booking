import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { UsersModule } from '../../../../backend/src/app/modules/app/users/users.module';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor(private http: HttpClient) {}

  getUser(id: string): Observable<UserModel> {
    return this.http.get<UserModel>('/api/users/' + id);
  }
}
