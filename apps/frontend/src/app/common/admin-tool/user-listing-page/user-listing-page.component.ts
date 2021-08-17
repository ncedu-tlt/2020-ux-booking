import { ButtonIconTypesEnum } from '../../../enums/button-icon-types.enum';
import { Component, Inject, OnInit } from '@angular/core';
import {
  Item,
  TableButtonClick,
  TableConfig
} from '../../../models/table.model';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { UserDataService } from '../../../services/user-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'b-list-of-users',
  templateUrl: './user-listing-page.component.html',
  styleUrls: ['./user-listing-page.component.less']
})
export class ListOfUsersComponent implements OnInit {
  config: TableConfig;

  userFilter: FormGroup;

  configTemplate: TableConfig = {
    items: [],
    columns: ['aname' /*, 'phoneNumber'*/],
    headers: {
      aname: this.i18NextService.t('adminTool.list-of-users.table.name')
      /*phoneNumber: this.i18NextService.t(
        'adminTool.list-of-users.table.phoneNumber'
      )*/
    },
    buttons: [/*ButtonIconTypesEnum.admin,*/ ButtonIconTypesEnum.blockUser]
  };

  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
    private formBuilder: FormBuilder,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.config = this.configTemplate;
    this.userFilter = this.formBuilder.group({
      name: ['', []]
    });
    this.loadUsers();
  }

  loadUsers(): void {
    const filter = {
      name: this.userFilter.value.name
    };
    this.userDataService.getUsers(filter).subscribe(users => {
      const userItems: Item[] = users.map(user => {
        return {
          id: user.id,
          aname: user.userName,
          phoneNumber: user.phoneNumber
        } as Item;
      });
      this.config = {
        ...this.configTemplate,
        items: userItems
      };
    });
  }

  public deleteUser(id: string): void {
    this.userDataService.deleteUser(id).subscribe(res => {
      this.loadUsers();
    });
  }

  public buttonClicked(event: TableButtonClick): void {
    const id: string = event.item.id;
    if (event.buttonType === ButtonIconTypesEnum.blockUser) {
      this.deleteUser(id);
    }
  }
}
