import { Component, Input } from '@angular/core';
import { ButtonIconTypesEnum } from '../../enums/button-icon-types.enum';
import { UserModel } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';

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

  constructor(private httpClient: HttpClient) {}

  onEditClick() {
    this.editable = !this.editable;
  }

  async save() {
    // await this.httpClient.patch('/users/' + this.user.id);
  }
}
