import { Injectable } from '@angular/core';
import { CookieAuthorizationService } from './cookie-authorization.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private CookieAuthorizationService: CookieAuthorizationService,
    private router: Router,
    private http: HttpClient
  ) {}

  postAuthorizationData(bodyAuthorization) {
    return this.http.post('/api/auth/login', bodyAuthorization);
  }

  postRegistrationData(bodyRegistration) {
    return this.http.post('/api/users', bodyRegistration);
  }
}
