import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenService } from '../services/token-service.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private router: Router, private tokenService: TokenService) {}

  canActivate(): boolean {
    if (this.tokenService.getToken()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
