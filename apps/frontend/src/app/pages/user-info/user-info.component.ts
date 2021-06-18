import { Component, Input } from '@angular/core';
import { ButtonIconTypesEnum } from '../../enums/button-icon-types.enum';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'b-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.less']
})
export class UserInfoComponent {
  editable = false;

  @Input()
  user: UserModel;

  buttonIconTypesEnum: typeof ButtonIconTypesEnum = ButtonIconTypesEnum;

  onEditClick() {
    this.editable = !this.editable;
  }
}
