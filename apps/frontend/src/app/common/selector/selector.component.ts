import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'b-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorComponent {
  value = '';
  flag = false;
  data;
  arrow: 'default' | 'rotate' = 'default';
  popupItems = false;
  dataStorage: string[] = [
    'Только завтрак',
    'Всё включено',
    'Завтрак и ужин',
    'Без питания'
  ];
  selectedItems: string[] = [];
  titleSelector = 'Питание';
  hint = 'Введите или выберите из списка';
  selectedHint = '';
  @Input()
  mode: 'multi' | 'default' = 'default';
  @Input()
  typeUser: 'admin' | 'default' = 'default';
  showPopup(): void {
    this.popupItems = !this.popupItems;
    this.arrow == 'rotate' ? (this.arrow = 'default') : (this.arrow = 'rotate');
  }

  filteredData(): string[] {
    this.data = this.dataStorage;
    if (this.value.length < 3) {
      return this.data;
    } else {
      const newData = this.data.filter(data =>
        data.toLowerCase().includes(this.value.toLowerCase())
      );
      newData.length === 0 ? (this.flag = true) : (this.flag = false);
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
        this.selectedHint = this.reducingString(this.selectedItems);
      } else this.selectedItems.push(item);
      this.selectedHint = this.reducingString(this.selectedItems);
    } else if (this.mode === 'default' && +this.selectedItems.length < 2) {
      +this.selectedItems.length === 0
        ? this.selectedItems.push(item)
        : (this.selectedItems[0] = item);
      this.popupItems = false;
      this.selectedHint = item;
    }
  }

  reducingString(array: string[]): string {
    const size = 30;
    let abridgedHint: string;
    if (array.toString().length < size) {
      abridgedHint = array.toString();
    } else {
      abridgedHint = array.toString().slice(0, size) + '...';
    }
    return abridgedHint;
  }

  outputMode(): boolean {
    return this.mode === 'default';
  }

  addItem(): void {
    this.data.push(this.value);
  }
  hisChecked(item: string): string {
    if (this.selectedItems.indexOf(item) != -1) {
      return 'checked';
    } else return 'default';
  }
}
