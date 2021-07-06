import { Component, Inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

import { NotificationTypesEnum } from '../../enums/notification-types.enum';
import { Router } from '@angular/router';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';

@Component({
  selector: 'b-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent {
  isDetectError = false;
  NotificationTypesEnum: typeof NotificationTypesEnum = NotificationTypesEnum;
  errorMessage = '';
  isPasswordValid = true;
  isRepeatedPasswordMinLength = false;

  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
    private loginService: LoginService,
    private router: Router
  ) {}

  formReview = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.maxLength(255)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255)
      ]),
      repeatedPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255)
      ])
    },
    {
      validators: [this.passwordEqual()]
    }
  );

  passwordEqual(): ValidatorFn {
    return (form: FormGroup): ValidationErrors | null => {
      // debugger;
      const firstPassword = form.get('password').value;
      const secondPassword = form.get('repeatedPassword').value;
      if (firstPassword && secondPassword) {
        this.isPasswordValid = firstPassword === secondPassword;
        this.isRepeatedPasswordMinLength = secondPassword.length > 8;
        return !this.isPasswordValid ? { passwordStrength: true } : null;
      }
      return null;
    };
  }

  closeNotification(): void {
    this.isDetectError = false;
  }

  showError(errorMessage: string): void {
    console.log(errorMessage);
    this.isDetectError = true;
    if (errorMessage === 'Unauthorized') {
      this.errorMessage = this.i18NextService.t(
        'registration.errorMessage.unauthorized'
      );
    } else if (errorMessage === 'Conflict') {
      this.errorMessage = this.i18NextService.t(
        'registration.errorMessage.conflict'
      );
    } else {
      this.errorMessage = this.i18NextService.t(
        'registration.errorMessage.default'
      );
    }
  }

  postRegistrationData() {
    const body = {
      name: this.formReview.value.name,
      email: this.formReview.value.email,
      password: this.formReview.value.password
    };
    this.loginService.postRegistrationData(body).subscribe(
      () => {
        this.isDetectError = false;
        this.router.navigate(['/authorization']);
      },
      error => {
        this.showError(error.statusText);
      }
    );
  }
}
