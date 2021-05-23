import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'b-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;

  getName(input: string) {
    this.name = input;
  }

  getEmail(input: string) {
    this.email = input;
  }

  getPassword(input: string) {
    this.password = input;
  }

  getRepeatPassword(input: string) {
    this.repeatPassword = input;
  }

  postAuthorizationData() {
    // //  api
    // console.log(this.email);
    // console.log(this.password);
  }
}
