import {
  Component,
  ElementRef,
  HostListener,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit
} from '@angular/core';

@Component({
  selector: 'b-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.less']
})
export class SelectorComponent implements OnInit {
  @Input()
  itemList: string[] = [];

  @Input()
  titleSelector: string;

  @Input()
  isMultiMode: boolean;

  @Input()
  isAddControlActive: boolean;

  @Output() handleClick: EventEmitter<string[]> = new EventEmitter();

  @Input()
  value = '';

  isNotFound = true;

  filteredSuggestions: string[] = [];

  isOpened = false;

  selectedItems: string[] = [];

  selectedHint = '';

  private readonly MINIMUM_SEARCH_CHARS: number = 2;

  private readonly IGNORED_NODES: string[] = [
    'svg',
    'path',
    'SPAN',
    'SVG-ICON'
  ];

  @ViewChild('selector') selectorElement!: ElementRef;

  @HostListener('window:click', ['$event'])
  onClick = (event): void => {
    if (this.IGNORED_NODES.includes((event.target as HTMLElement).nodeName)) {
      return;
    }
    const elementSelector = this.searchSelectorElement(event.target);
    if (elementSelector !== this.selectorElement.nativeElement) {
      this.isOpened = false;
    } else {
      this.isOpened = !this.isOpened;
    }
  };

  ngOnInit(): void {
    if (this.value) {
      this.setSelectedItem(this.value);
    }
  }

  searchSelectorElement(element: HTMLElement): HTMLElement {
    if (element.classList.contains('selector')) {
      return element;
    }
    if (element.parentElement) {
      return this.searchSelectorElement(element.parentElement);
    } else {
      return null;
    }
  }

  filterItems(): string[] {
    if (this.itemList) {
      this.filteredSuggestions = this.itemList;
    }
    if (this.value.length < this.MINIMUM_SEARCH_CHARS) {
      return this.filteredSuggestions;
    } else {
      return this.filteredSuggestions.filter(data =>
        data.toLowerCase().includes(this.value.toLowerCase())
      );
    }
  }

  handleChange(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    if (
      this.value.length > this.MINIMUM_SEARCH_CHARS &&
      this.filteredSuggestions.length
    ) {
      this.filteredSuggestions = this.itemList.filter(data =>
        data.toLowerCase().includes(this.value.toLowerCase())
      );
    } else if (this.filteredSuggestions.length) {
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
    } else if (
      !this.isMultiMode &&
      this.selectedItems.length < this.MINIMUM_SEARCH_CHARS
    ) {
      if (this.selectedItems.length === 0) {
        this.selectedItems.push(item);
      } else {
        this.selectedItems[0] = item;
      }
      this.isOpened = false;
      this.selectedHint = item;
    }
    this.handleClick.emit(this.selectedItems);
  }

  addItem(): void {
    this.itemList.push(this.value);
    this.isNotFound = true;
    if (!this.isMultiMode) {
      this.selectedItems = [];
    }
    this.selectedItems.push(this.value);
    this.handleClick.emit(this.selectedItems);
  }

  isItemSelected(item: string): boolean {
    return this.selectedItems.includes(item);
  }
}
