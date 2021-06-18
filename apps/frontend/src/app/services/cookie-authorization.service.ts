import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieAuthorizationService {
  time = new Date();

  constructor(private cookieService: CookieService) {}

  setTokenToCookie(token) {
    this.time.setHours(this.time.getHours() + 1);
    this.cookieService.set('token', token, this.time, '/');
  }
}
