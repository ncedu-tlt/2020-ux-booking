import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'b-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizationComponent {
  email: string;
  password: string;

  constructor(private http: HttpClient) {}

  setEmail(input: string) {
    this.email = input;
  }

  setPassword(input: string) {
    this.password = input;
  }

  postAuthorizationData() {
    const body = {
      email: this.email,
      password: this.password
    };
    return this.http.post('/api/products', body);
  }
}
