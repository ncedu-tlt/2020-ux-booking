import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { UserDto } from '../../../../backend/src/app/modules/app/users/user.dto';
import { CookieAuthorizationService } from './cookie-authorization.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  user: Observable<string> = this.currentUserSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private CookieAuthorizationService: CookieAuthorizationService
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
      .get<any>('/api/users/current')
      .subscribe((userInfo: any) => {
        this.currentUserSubject.next(userInfo.user.username);
      });
  }

  deleteUser(): void {
    //
  }
}
