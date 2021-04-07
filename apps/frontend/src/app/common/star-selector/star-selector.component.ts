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

  selectItems = 0;

  hoverItems = 0;

  arrState: number[] = [1, 2, 3, 4, 5, 6];

  getItemClass(index: number): string {
    if (this.selectItems >= index) {
      return '_blue-dark';
    } else if (this.hoverItems >= index) {
      return '_blue';
    } else {
      return '_grey-light';
    }
  }

  selectItemsChange(i: number): void {
    if (this.stateItems == true) {
      this.selectItems = i;
    }
  }

  hoverItemsChange(i: number): void {
    if (this.stateItems == true) {
      this.hoverItems = i;
    }
  }

  returnDefaultState(): void {
    this.hoverItems = 0;
  }
}
