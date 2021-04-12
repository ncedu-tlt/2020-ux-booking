import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ButtonIconTypesEnum } from '../../enums/button-icon-types.enum';

@Component({
  selector: 'b-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonIconComponent implements OnInit {
  iconPath: string;
  _type: string;
  @Input()
  set type(value: ButtonIconTypesEnum) {
    this._type = value;
    this.setButtonIcon();
  }
  @Input()
  Disabled = false;
  ngOnInit() {
    this.setButtonIcon();
  }
  private setButtonIcon(): void {
    switch (this._type) {
      case 'edit':
        this.iconPath = 'assets/icons/edit.svg';
        break;
      case 'delete':
        this.iconPath = 'assets/icons/trash.svg';
        break;
      case 'blockUser':
        this.iconPath = 'assets/icons/blockuser.svg';
        break;
      case 'admin':
        this.iconPath = 'assets/icons/admin.svg';
        break;
      case 'add':
        this.iconPath = 'assets/icons/plus.svg';
        break;
      case 'checkMark':
        this.iconPath = 'assets/icons/checkmark.svg';
        break;
      case 'like':
        this.iconPath = 'assets/icons/like.svg';
        break;
      case 'Share':
        this.iconPath = 'assets/icons/share.svg';
        break;
      case 'RIGHT':
        this.iconPath = 'assets/icons/arrow.svg';
        break;
      case 'LEFT':
        this.iconPath = 'assets/icons/left.svg';
        break;
      case 'cross':
        this.iconPath = 'assets/icons/cross.svg';
        break;
      case 'star':
        this.iconPath = 'assets/icons/star.svg';
        break;
      default:
        break;
    }
  }
}
