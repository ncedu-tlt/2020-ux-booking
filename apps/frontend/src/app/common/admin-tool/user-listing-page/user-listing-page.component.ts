import { ButtonIconTypesEnum } from '../../../enums/button-icon-types.enum';
import { Component, Inject, OnInit } from '@angular/core';
import {
  Item,
  TableButtonClick,
  TableConfig
} from '../../../models/table.model';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { UserDataService } from '../../../services/user-data.service';
@Component({
  selector: 'b-list-of-users',
  templateUrl: './user-listing-page.component.html',
  styleUrls: ['./user-listing-page.component.less']
})
export class ListOfUsersComponent implements OnInit {
  config: TableConfig;

  configTemplate: TableConfig = {
    items: [],
    columns: ['aname', 'phoneNumber'],
    headers: {
      aname: this.i18NextService.t('adminTool.list-of-users.table.name'),
      phoneNumber: this.i18NextService.t(
        'adminTool.list-of-users.table.phoneNumber'
      )
    },
    buttons: [ButtonIconTypesEnum.admin, ButtonIconTypesEnum.blockUser]
  };

  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.config = this.configTemplate;
    this.loadUsers();
  }

  loadUsers(): void {
    this.userDataService.getUsers().subscribe(users => {
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
