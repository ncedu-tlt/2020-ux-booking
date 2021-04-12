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
  _type: ButtonIconTypesEnum;
  @Input()
  set type(value: ButtonIconTypesEnum) {
    this._type = value;
    this.setButtonIcon();
  }

  ngOnInit() {
    this.setButtonIcon();
  }

  private setButtonIcon(): void {
    switch (this._type) {
      case ButtonIconTypesEnum.edit:
        this.iconPath = 'assets/icons/edit.svg';
        break;
      case ButtonIconTypesEnum.delete:
        this.iconPath = 'assets/icons/trash.svg';
        break;
      case ButtonIconTypesEnum.blockUser:
        this.iconPath = 'assets/icons/blockuser.svg';
        break;
      case ButtonIconTypesEnum.admin:
        this.iconPath = 'assets/icons/admin.svg';
        break;
      case ButtonIconTypesEnum.add:
        this.iconPath = 'assets/icons/plus.svg';
        break;
      case ButtonIconTypesEnum.checkMark:
        this.iconPath = 'assets/icons/checkmark.svg';
        break;
      case ButtonIconTypesEnum.like:
        this.iconPath = 'assets/icons/like.svg';
        break;
      case ButtonIconTypesEnum.share:
        this.iconPath = 'assets/icons/share.svg';
        break;
      case ButtonIconTypesEnum.right:
        this.iconPath = 'assets/icons/arrow.svg';
        break;
      case ButtonIconTypesEnum.left:
        this.iconPath = 'assets/icons/left.svg';
        break;
      case ButtonIconTypesEnum.cross:
        this.iconPath = 'assets/icons/cross.svg';
        break;
      case ButtonIconTypesEnum.star:
        this.iconPath = 'assets/icons/star.svg';
        break;
      default:
        this.iconPath = 'assets/icons/cross.svg';
        break;
    }
  }
}
