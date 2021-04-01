import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'b-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.less']
})
export class DropdownComponent {
  @Input()
  sortList: string[] = [];

  @Input()
  defaultState = '';

  @Output()
  stateChange: EventEmitter<string> = new EventEmitter<string>();

  stateViewList = true;

  addClass(state?: string): string {
    if (this.defaultState === state) {
      return '_active';
    } else if (this.stateViewList === true) {
      return '_opened';
    }
  }

  changeStateViewList(): void {
    this.stateViewList = !this.stateViewList;
  }

  changeState(state: string): void {
    this.stateChange.emit(state);
    this.stateViewList = !this.stateViewList;
    this.defaultState = state;
  }
}
