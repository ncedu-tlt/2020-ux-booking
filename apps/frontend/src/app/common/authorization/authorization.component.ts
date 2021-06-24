import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CookieAuthorizationService } from '../../services/cookie-authorization.service';

@Component({
  selector: 'b-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizationComponent {
  email: string;
  password: string;

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

  postAuthorizationData() {
    const bodyAuthorization = {
      email: this.formReview.value.email,
      password: this.formReview.value.password
    };
    return this.http.post('/api/auth/login', bodyAuthorization).subscribe(
      accessToken => {
        this.CookieAuthorizationService.setTokenToCookie(accessToken);
        this.router.navigate(['/']);
      },
      error => {
        console.log(error.statusText);
      }
    );
  }
}
