import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationTypesEnum } from '../../enums/notification-types.enum';
import { LoginService } from '../../services/login.service';
import { TokenService } from '../../services/token-service.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';

@Component({
  selector: 'b-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.less']
})
export class AuthorizationComponent {
  isDetectError = false;
  NotificationTypesEnum: typeof NotificationTypesEnum = NotificationTypesEnum;
  errorMessage: string;

  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private cookieAuthorizationService: TokenService,
    private router: Router,
    private userService: UserService
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
    this.isDetectError = false;
  }

  showError(errorMessage: string): void {
    this.isDetectError = true;
    if (errorMessage === 'Unauthorized') {
      this.errorMessage = this.i18NextService.t(
        'authorization.errorMessage.unauthorized'
      );
    } else {
      this.errorMessage = this.i18NextService.t(
        'authorization.errorMessage.default'
      );
    }
  }

  postAuthorizationData() {
    const bodyAuthorization = {
      email: this.formReview.value.email,
      password: this.formReview.value.password
    };
    this.loginService.postAuthorizationData(bodyAuthorization).subscribe(
      accessToken => {
        this.isDetectError = false;
        this.cookieAuthorizationService.setTokenToCookie(accessToken);
        this.userService.fetchCurrentUser();
        this.router.navigate(['/']);
      },
      error => {
        this.showError(error.statusText);
      }
    );
  }
}
