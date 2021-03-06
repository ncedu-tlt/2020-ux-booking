import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { TokenService } from './token-service.service';
import { UserDto } from '@booking/models/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  user: Observable<string> = this.currentUserSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private CookieAuthorizationService: TokenService
  ) {
    this.fetchCurrentUser();
  }

  setUser(user): void {
    this.currentUserSubject.next(user);
  }

  getUser(): Observable<string> {
    return this.user;
  }

  fetchCurrentUser(): void {
    this.httpClient
      .get<UserDto>('/api/users/current')
      .subscribe((userInfo: UserDto) => {
        this.currentUserSubject.next(userInfo.userName);
      });
  }

  deleteUser(): void {
    this.CookieAuthorizationService.deleteToken();
    location.reload();
  }
}
