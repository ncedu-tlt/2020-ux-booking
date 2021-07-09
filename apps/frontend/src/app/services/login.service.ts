import { Injectable } from '@angular/core';
import { TokenService } from './token-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RegisterUserDto } from '@booking/models/register.user.dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private CookieAuthorizationService: TokenService,
    private router: Router,
    private http: HttpClient
  ) {}

  postAuthorizationData(bodyAuthorization) {
    return this.http.post('/api/auth/login', bodyAuthorization);
  }

  postRegistrationData(bodyRegistration: RegisterUserDto) {
    return this.http.post('/api/users', bodyRegistration);
  }
}
