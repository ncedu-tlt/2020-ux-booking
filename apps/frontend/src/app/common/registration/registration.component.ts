import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'b-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent {
  firstName: string;
  email: string;
  password: string;
  repeatPassword: string;

  constructor(private http: HttpClient) {}

  setName(input: string) {
    this.firstName = input;
  }

  setEmail(input: string) {
    this.email = input;
  }

  setPassword(input: string) {
    this.password = input;
  }

  // валидатор на проверку паролей
  setRepeatPassword(input: string) {
    this.repeatPassword = input;
  }

  postRegistrationData() {
    const body = {
      firstName: this.firstName,
      email: this.email,
      password: this.password
    };
    return this.http
      .post('/api/auth/login', body)
      .subscribe(error => console.log(error));
  }
}
