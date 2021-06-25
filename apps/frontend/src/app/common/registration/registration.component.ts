import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationTypesEnum } from '../../enums/notification-types.enum';

@Component({
  selector: 'b-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent {
  detectError = false;
  NotificationTypesEnum: typeof NotificationTypesEnum = NotificationTypesEnum;
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
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
      const firstPassword = form.get('password').value;
      const secondPassword = form.get('repeatedPassword').value;
      if (firstPassword && secondPassword) {
        const passwordValid = firstPassword === secondPassword;
        return !passwordValid ? { passwordStrength: true } : null;
      }
      return null;
    };
  }

  closeNotification(): void {
    this.detectError = false;
  }

  postRegistrationData() {
    const body = {
      name: this.formReview.value.name,
      email: this.formReview.value.email,
      password: this.formReview.value.password
    };
    return this.http.post('/api/users', body).subscribe(
      nothing => {
        this.detectError = false;
        this.router.navigate(['/authorization']);
      },
      error => {
        this.detectError = true;
        this.errorMessage = error.statusText;
      }
    );
  }
}
