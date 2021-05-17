import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'b-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizationComponent {
  email: string;
  password: string;

  getEmail(input: string) {
    this.email = input;
  }

  getPassword(input: string) {
    this.password = input;
  }

  setAuthorizationData() {
    console.log(this.email);
    console.log(this.password);
  }
}
