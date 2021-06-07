import { Component, Input, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'b-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {
  user: UserModel = {
    emailNotification: false,
    dateOfBirth: '',
    email: '',
    firstName: '',
    id: '',
    lastName: '',
    nationality: '',
    phone: '',
    sex: ''
  };

  @Input()
  userId: string;

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.userDataService
      .getUser(this.userId)
      .subscribe(value => (this.user = value));
  }
}
