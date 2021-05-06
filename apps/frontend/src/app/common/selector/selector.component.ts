import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'b-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorComponent implements OnInit {
  @Input()
  itemList: string[];
  @Input()
  titleSelector: string;
  @Input()
  mode: 'multi' | 'default' = 'default';
  @Input()
  isAdmin: boolean;
  value = '';
  isNotFound = true;
  filteredSuggestions: string[] = [];
  isRotated = false;
  selectedItems: string[] = [];
  selectedHint = '';

  showPopup(): void {
    this.isRotated = !this.isRotated;
  }

  closePopup(event: Event): void {
    const isSelector = (event.target as HTMLInputElement).classList.contains(
      'selector'
    );
    if (isSelector) {
      this.isRotated = false;
    }
  }

  handleChange(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    if (this.value.length > 3) {
      this.filteredSuggestions = this.itemList.filter(data =>
        data.toLowerCase().includes(this.value.toLowerCase())
      );
    } else {
      this.filteredSuggestions = this.itemList;
    }
    this.isNotFound = !!this.filteredSuggestions.length;
  }

  isAddControlActive(item: string): void {
    if (this.mode === 'multi') {
      if (this.selectedItems.indexOf(item) != -1) {
        this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
        this.selectedHint = this.selectedItems.toString();
      } else this.selectedItems.push(item);
      this.selectedHint = this.selectedItems.toString();
    } else if (this.mode === 'default' && +this.selectedItems.length < 2) {
      if (!this.selectedItems.length) {
        this.selectedItems.push(item);
      } else this.selectedItems[0] = item;
      this.isRotated = false;
      this.selectedHint = item;
    }
  }

  addItem(): void {
    this.filteredSuggestions.push(this.value);
    this.itemList.push(this.value);
    this.isNotFound = !this.isNotFound;
  }

  isItemSelected(item: string): boolean {
    return this.selectedItems.includes(item);
  }

  ngOnInit(): void {
    this.filteredSuggestions = this.itemList;
  }
}
