import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieAuthorizationService } from '../services/cookie-authorization.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenService: CookieAuthorizationService
  ) {}

  canActivate(): boolean {
    if (this.tokenService.getToken()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
