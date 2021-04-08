import { Component, Input } from '@angular/core';

@Component({
  selector: 'b-star-selector',
  templateUrl: './star-selector.component.html',
  styleUrls: ['./star-selector.component.less']
})
export class StarSelectorComponent {
  @Input()
  stateItems = true;

  @Input()
  subName = '';

  selectedItems = 0;

  hoveredItems = 0;

  savedStateSelectedItems = 0;

  arrState: number[] = [1, 2, 3, 4, 5, 6];

  getItemClass(index: number): string {
    if (this.selectedItems >= index) {
      this.savedStateSelectedItems = this.selectedItems;
      return '_blue-dark';
    } else if (this.hoveredItems >= index) {
      return '_blue';
    } else {
      return '_grey-light';
    }
  }

  changeSelectedItems(i: number): void {
    if (this.stateItems == true) {
      this.selectedItems = i;
    }
  }

  changeHoveredItems(i: number): void {
    if (this.stateItems == true) {
      this.selectedItems = 0;
      this.hoveredItems = i;
    }
  }

  resetState(): void {
    this.selectedItems = this.savedStateSelectedItems;
    this.hoveredItems = 0;
  }
}
