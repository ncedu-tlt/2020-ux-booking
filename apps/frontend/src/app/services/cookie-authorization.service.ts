import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieAuthorizationService {
  _token: string;
  time = new Date();

  constructor(private cookieService: CookieService) {}

  setTokenToCookie(token) {
    this._token = token;
    this.cookieService.set('token', (this._token, this.generateData(true)));
  }

  generateData(addOneHour: boolean): string {
    const hours = this.time.getHours();
    const minutes = this.time.getMinutes();
    const seconds = this.time.getSeconds();
    if (addOneHour) {
      return (hours + 1).toString() + minutes.toString() + seconds.toString();
    }
    return hours.toString() + minutes.toString() + seconds.toString();
  }

  comparisonTimeForDeleteToken(): void {
    if (this.generateData(false) >= this.generateData(true)) {
      console.log('END SESSION');
    }
  }
}
