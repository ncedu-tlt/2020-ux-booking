import { Injectable } from '@angular/core';
import { CookieAuthorizationService } from './cookie-authorization.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isDetectError = true;
  errorMessage: string;
  user = {
    firstName: '',
    lastName: ''
  };

  constructor(
    private CookieAuthorizationService: CookieAuthorizationService,
    private router: Router,
    private http: HttpClient
  ) {}

  postAuthorizationData(bodyAuthorization) {
    return this.http.post('/api/auth/login', bodyAuthorization).subscribe(
      accessToken => {
        this.isDetectError = false;
        this.CookieAuthorizationService.setTokenToCookie(accessToken);
        this.user.firstName = 'userName';
        this.router.navigate(['/']);
      },
      error => {
        this.isDetectError = true;
        this.errorMessage = error.statusText;
        console.log(this.errorMessage);
      }
    );
  }

  postRegistrationData(bodyRegistration) {
    return this.http.post('/api/users', bodyRegistration).subscribe(
      () => {
        this.isDetectError = false;
        this.router.navigate(['/authorization']);
      },
      error => {
        this.isDetectError = true;
        this.errorMessage = error.statusText;
      }
    );
  }
}
