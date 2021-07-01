import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationTypesEnum } from '../../enums/notification-types.enum';
import { LoginService } from '../../services/login.service';

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
    private formBuilder: FormBuilder,
    private LoginService: LoginService
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

  postAuthorizationData() {
    const bodyAuthorization = {
      email: this.formReview.value.email,
      password: this.formReview.value.password
    };
    this.LoginService.postAuthorizationData(bodyAuthorization);
    this.isDetectError = this.LoginService.isDetectError;
    this.errorMessage = this.LoginService.errorMessage;
  }
}
