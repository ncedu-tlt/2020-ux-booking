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
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private CookieAuthorizationService: CookieAuthorizationService
  ) {}

  formReview = this.fb.group({
    email: [
      'lorem@lorem.com',
      [Validators.required, Validators.email, Validators.maxLength(255)]
    ],
    password: [
      'loremlorem',
      [Validators.required, Validators.minLength(8), Validators.maxLength(255)]
    ]
  });

  postAuthorizationData() {
    const bodyAuthorization = {
      email: this.formReview.value.email,
      password: this.formReview.value.password
    };
    return this.http.post('/api/auth/login', bodyAuthorization).subscribe(
      data => {
        let token: string;
        for (const k in data) {
          token = data[k];
        }
        this.CookieAuthorizationService.setTokenToCookie(token);
        this.router.navigate(['/']).then(r => r);
      },
      error => {
        console.log(error.status);
        console.log(error.statusText);
      }
    );
  }
}
