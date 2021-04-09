import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { NotificationTypesEnum } from '../../enums/notification-types.enum';

@Component({
  selector: 'b-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less']
})
export class NotificationComponent implements OnInit {
  @HostBinding('class') hostClass = 'notification';

  @Input()
  set type(value: NotificationTypesEnum) {
    this._type = value;
    this.setIcon();
  }

  @Input()
  message: string;

  @Output()
  closeEvent: EventEmitter<void> = new EventEmitter<void>();

  iconPath: string;
  _type: string;

  ngOnInit() {
    this.setIcon();
  }

  private setIcon(): void {
    if (this._type === NotificationTypesEnum.error) {
      this.iconPath = 'assets/icons/cross.svg';
    } else {
      this.iconPath = 'assets/icons/checkmark.svg';
    }
  }

  closeNotification(): void {
    this.closeEvent.next();
  }
}
