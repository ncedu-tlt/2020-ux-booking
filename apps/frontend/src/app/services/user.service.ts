import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserSubject: Subject<string> = new Subject<string>();

  user: Observable<string> = this.currentUserSubject.asObservable();

  setUser(user): void {
    this.currentUserSubject.next(user);
  }

  getUser(): Observable<string> {
    return this.user;
  }

  deleteUser(): void {
    //
  }
}
