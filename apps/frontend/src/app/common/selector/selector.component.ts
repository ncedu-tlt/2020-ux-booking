import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'b-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorComponent {
  value = '';
  isNotFound = false;
  filteredSuggestions;
  arrow: 'default' | 'rotate' = 'default';
  popupItems = false;
  selectedItems: string[] = [];
  selectedHint = '';
  @Input()
  itemList: string[];
  @Input()
  titleSelector;
  @Input()
  mode: 'multi' | 'default' = 'default';
  @Input()
  typeUser: 'admin' | 'default' = 'default';

  showPopup(): void {
    this.popupItems = !this.popupItems;
    this.arrow == 'rotate' ? (this.arrow = 'default') : (this.arrow = 'rotate');
  }

  closePopup($event): void {
    const isSelector = $event.target.classList.contains('selector');
    if (isSelector) {
      this.popupItems = false;
      this.arrow = 'default';
    }
  }

  filteredData(): string[] {
    this.filteredSuggestions = this.itemList;
    if (this.value.length < 3) {
      return this.filteredSuggestions;
    } else {
      const newData = this.filteredSuggestions.filter(data =>
        data.toLowerCase().includes(this.value.toLowerCase())
      );
      newData.length === 0
        ? (this.isNotFound = true)
        : (this.isNotFound = false);
      return newData;
    }
  }

  handleChange(event) {
    this.value = event.target.value;
  }

  showTitle(item: string): void {
    if (this.mode === 'multi') {
      if (this.selectedItems.indexOf(item) != -1) {
        this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
        this.selectedHint = this.getString(this.selectedItems);
      } else this.selectedItems.push(item);
      this.selectedHint = this.getString(this.selectedItems);
    } else if (this.mode === 'default' && +this.selectedItems.length < 2) {
      +this.selectedItems.length === 0
        ? this.selectedItems.push(item)
        : (this.selectedItems[0] = item);
      this.popupItems = false;
      this.selectedHint = item;
    }
  }

  getString(array: string[]): string {
    return array.toString();
  }

  outputMode(): boolean {
    return this.mode === 'default';
  }

  addItem(): void {
    this.filteredSuggestions.push(this.value);
  }

  getStyleMode(item: string): string {
    return this.getStatus(item) ? 'checked' : 'default';
  }

  getStatus(item: string): boolean {
    return this.selectedItems.includes(item);
  }
}
