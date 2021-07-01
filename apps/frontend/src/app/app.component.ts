import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'b-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private LoginService: LoginService) {}

  title = 'frontend';
  userName = this.LoginService.user.firstName;
}
