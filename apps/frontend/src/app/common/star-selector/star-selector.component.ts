import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'b-star-selector',
  templateUrl: './star-selector.component.html',
  styleUrls: ['./star-selector.component.less']
})
export class StarSelectorComponent {
  @Input()
  isEditable = true;

  @Input()
  subName = '';

  @Input()
  selectedItem: number;

  /*@Input()
  isSizeSmall = true;*/

  @Output()
  selectedItemEvent: EventEmitter<number> = new EventEmitter<number>();

  hoveredItems = 0;

  savedStateSelectedItems = 0;

  arrState: number[] = [1, 2, 3, 4, 5, 6];

  sizeClassName: string;

  @Input()
  set isSizeSmall(value: string) {
    this.sizeClassName = value;
  }

  getItemClass(index: number): string {
    if (this.selectedItem >= index) {
      this.savedStateSelectedItems = this.selectedItem;
      return '_blue-dark';
    } else if (this.hoveredItems >= index) {
      return '_blue';
    } else {
      return '_grey-light';
    }
  }

  changeSelectedItems(index: number): void {
    if (this.isEditable == true) {
      this.selectedItem = index;
      this.selectedItemEvent.emit(index);
    }
  }

  changeHoveredItems(index: number): void {
    if (this.isEditable == true) {
      this.selectedItem = 0;
      this.hoveredItems = index;
    }
  }

  resetState(): void {
    this.selectedItem = this.savedStateSelectedItems;
    this.hoveredItems = 0;
  }
}
