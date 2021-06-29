import { ButtonIconTypesEnum } from '../../enums/button-icon-types.enum';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Item, TableButtonClick, TableConfig } from '../../models/table.model';

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

  buttonClick(buttonType: ButtonIconTypesEnum, item: Item): void {
    this.buttonClickEvent.emit({ buttonType, item });
  }
}
