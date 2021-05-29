import { ButtonIconTypesEnum } from '../../enums/button-icon-types.enum';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'b-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @Input()
  items: object[] = [];

  @Input()
  columns: string[] = [];

  @Input()
  headers: object;

  @Input()
  buttons: object[] = [];

  @Output()
  buttonClickEvent: EventEmitter<TableButtonClick> = new EventEmitter<TableButtonClick>();

  buttonClick(buttonType: ButtonIconTypesEnum, itemId: any): void {
    this.buttonClickEvent.emit(new TableButtonClick(buttonType, itemId));
  }
}

export class TableButtonClick {
  constructor(public buttonType: ButtonIconTypesEnum, public itemId: any) {}
}