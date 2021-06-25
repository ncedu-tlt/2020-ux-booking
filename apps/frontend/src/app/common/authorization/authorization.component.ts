import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CookieAuthorizationService } from '../../services/cookie-authorization.service';
import { NotificationTypesEnum } from '../../enums/notification-types.enum';

@Component({
  selector: 'b-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.less']
})
export class AuthorizationComponent {
  detectError = false;
  NotificationTypesEnum: typeof NotificationTypesEnum = NotificationTypesEnum;
  errorMessage: string;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private CookieAuthorizationService: CookieAuthorizationService
  ) {}

  formReview = this.formBuilder.group({
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(255)]
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(255)]
    ]
  });

  closeNotification(): void {
    this.detectError = false;
  }

  postAuthorizationData() {
    const bodyAuthorization = {
      email: this.formReview.value.email,
      password: this.formReview.value.password
    };
    return this.http.post('/api/auth/login', bodyAuthorization).subscribe(
      accessToken => {
        this.detectError = false;
        this.CookieAuthorizationService.setTokenToCookie(accessToken);
        this.router.navigate(['/']);
      },
      error => {
        this.detectError = true;
        this.errorMessage = error.statusText;
      }
    );
  }
}
