import { Component, Input, OnInit } from '@angular/core';
import { ButtonIconTypesEnum } from '../../enums/button-icon-types.enum';
import { UserModel } from '../../models/user.model';
import { UserDataService } from '../../services/user-data.service';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'b-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.less']
})
export class UserInfoComponent {
  editable = false;

  isNotificationVisible = false;

  @Input()
  user: UserModel;

  buttonIconTypesEnum: typeof ButtonIconTypesEnum = ButtonIconTypesEnum;

  constructor(private userDataService: UserDataService) {}

  onEditClick() {
    this.editable = true;
  }

  save() {
    this.editable = false;
    this.isNotificationVisible = true;
    // this.userDataService.updateUserInfo(this.user).subscribe(r => {
    // });
  }

  cancel() {
    this.editable = false;
  }
}
