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
  config: TableConfig;

  @Output()
  buttonClickEvent: EventEmitter<TableButtonClick> = new EventEmitter<TableButtonClick>();

  buttonClick(buttonType: ButtonIconTypesEnum, itemId: ItemId): void {
    this.buttonClickEvent.emit({ buttonType, itemId });
  }
}

export type ItemId = unknown;

export type Item = {
  id: ItemId;
};

export type TableConfig = {
  items: Item[];
  columns: string[];
  headers: {
    [key: string]: string;
  };
  buttons: ButtonIconTypesEnum[];
};

export type TableButtonClick = {
  buttonType: ButtonIconTypesEnum;
  itemId: ItemId;
};
