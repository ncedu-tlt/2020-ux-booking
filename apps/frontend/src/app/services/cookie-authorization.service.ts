import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieAuthorizationService {
  time = new Date();

  accessToken;

  private readonly TOKEN_KEY: string = 'accessToken';

  constructor(private cookieService: CookieService) {
    this.accessToken = this.cookieService.get(this.TOKEN_KEY);
  }

  setTokenToCookie(token) {
    this.accessToken = token.accessToken;
    this.time.setHours(this.time.getHours() + 1);
    this.cookieService.set(this.TOKEN_KEY, this.accessToken, this.time, '/');
  }

  getToken(): string {
    return this.accessToken;
  }

  deleteToken(): void {
    this.accessToken = '';
    this.cookieService.delete(this.TOKEN_KEY, '/');
  }
}
