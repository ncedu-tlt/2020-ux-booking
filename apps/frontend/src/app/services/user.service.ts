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
  currentUserIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  user: Observable<string> = this.currentUserSubject.asObservable();
  userId: Observable<string> = this.currentUserIdSubject.asObservable();

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

  getUserId(): Observable<string> {
    return this.userId;
  }

  fetchCurrentUser(): void {
    this.httpClient
      .get<UserDto>('/api/auth/current')
      .subscribe((userInfo: UserDto) => {
        this.currentUserSubject.next(userInfo.user.username);
        this.currentUserIdSubject.next(userInfo.user.userId);
      });
  }

  deleteUser(): void {
    this.CookieAuthorizationService.deleteToken();
    location.reload();
  }
}
