import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'b-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorComponent {
  @Input()
  itemList: string[];
  @Input()
  titleSelector: string;
  @Input()
  mode: 'multi' | 'default' = 'default';
  @Input()
  userType: 'admin' | 'default' = 'default';
  value = '';
  isNotFound = true;
  filteredSuggestions: string[] = [];
  isRotated = false;
  popupItems = false;
  selectedItems: string[] = [];
  selectedHint = '';

  showPopup(): void {
    this.popupItems = !this.popupItems;
    this.isRotated = !this.isRotated;
  }

  closePopup($event): void {
    const isSelector = $event.target.classList.contains('selector');
    if (isSelector) {
      this.popupItems = false;
      this.isRotated = false;
    }
  }

  filteredData(): string[] {
    this.filteredSuggestions = this.itemList;
    if (this.value.length < 3) {
      return this.filteredSuggestions;
    } else {
      return this.filteredSuggestions.filter(data =>
        data.toLowerCase().includes(this.value.toLowerCase())
      );
    }
  }

  handleChange($event): void {
    this.value = $event.target.value;
    this.value.length === 0
      ? (this.isNotFound = true)
      : (this.isNotFound = false);
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
      this.isRotated = false;
      this.selectedHint = item;
    }
  }

  getString(array: string[]): string {
    return array.toString();
  }

  resetMode(): boolean {
    return this.mode === 'default';
  }

  addItem(): void {
    this.filteredSuggestions.push(this.value);
  }

  isItemSelected(item: string): boolean {
    return this.selectedItems.includes(item);
  }
}
