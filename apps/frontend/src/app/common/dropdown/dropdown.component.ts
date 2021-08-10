import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HotelDto } from '@booking/models/hotel.dto';

@Component({
  selector: 'b-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.less']
})
export class DropdownComponent {
  @Input()
  items: string[] = [];

  @Input()
  activeItem = '';

  @Input()
  isLeftAligned = false;

  @Output()
  stateChange: EventEmitter<string> = new EventEmitter<string>();

  isOpened = false;
  @Output()
  infoChange: EventEmitter<[]> = new EventEmitter<[]>();

  changeStateViewList(): void {
    this.isOpened = !this.isOpened;
  }

  changeState(state: string): void {
    this.stateChange.emit(state);
    this.isOpened = !this.isOpened;
    this.activeItem = state;
  }
  changeInfo(items: []): void {
    this.infoChange.emit(items);
  }
}
