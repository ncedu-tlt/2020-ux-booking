import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild
} from '@angular/core';

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
  isMultiMode: boolean;
  @Input()
  isAddControlActive: boolean;
  value = '';
  isNotFound = true;
  filteredSuggestions: string[] = [];
  isOpened = false;
  selectedItems: string[] = [];
  selectedHint = '';
  @ViewChild('selector') selectorElement!: ElementRef;
  @HostListener('window:click', ['$event'])
  onClick = (event): void => {
    if (
      ['svg', 'path', 'SPAN', 'SVG-ICON'].includes(
        (event.target as HTMLElement).nodeName
      )
    ) {
      return;
    }
    const elementSelector = this.searchSelectorElement(event.target);
    if (elementSelector !== this.selectorElement.nativeElement) {
      this.isOpened = false;
    } else {
      this.isOpened = !this.isOpened;
    }
  };

  searchSelectorElement(element: HTMLElement): HTMLElement {
    if (element.classList.contains('selector')) {
      return element;
    }
    if (element.parentElement) {
      return this.searchSelectorElement(element.parentElement);
    } else return null;
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

  handleChange(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    if (this.value.length > 2) {
      this.filteredSuggestions = this.itemList.filter(data =>
        data.toLowerCase().includes(this.value.toLowerCase())
      );
    } else {
      this.filteredSuggestions = this.itemList;
    }
    this.isNotFound = !!this.filteredSuggestions.length;
  }

  setSelectedItem(item: string): void {
    if (this.isMultiMode) {
      if (this.selectedItems.indexOf(item) != -1) {
        this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
        this.selectedHint = this.selectedItems.toString();
      } else this.selectedItems.push(item);
      this.selectedHint = this.selectedItems.toString();
    } else if (!this.isMultiMode && +this.selectedItems.length < 2) {
      +this.selectedItems.length === 0
        ? this.selectedItems.push(item)
        : (this.selectedItems[0] = item);
      this.isOpened = false;
      this.selectedHint = item;
    }
  }

  addItem(): void {
    this.filteredSuggestions.push(this.value);
    this.isNotFound = true;
  }

  isItemSelected(item: string): boolean {
    return this.selectedItems.includes(item);
  }
}
