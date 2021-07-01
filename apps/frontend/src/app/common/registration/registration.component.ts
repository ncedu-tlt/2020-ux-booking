import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

import { NotificationTypesEnum } from '../../enums/notification-types.enum';

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

  constructor(private LoginService: LoginService) {}

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

  postRegistrationData() {
    const body = {
      name: this.formReview.value.name,
      email: this.formReview.value.email,
      password: this.formReview.value.password
    };
    this.LoginService.postRegistrationData(body);
    this.isDetectError = this.LoginService.isDetectError;
    this.errorMessage = this.LoginService.errorMessage;
  }
}
