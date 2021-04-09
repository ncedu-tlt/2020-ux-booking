import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'b-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorComponent {
  value = '';
  alertFlag = false;
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
  hint = 'Введите или выберите из списка';
  selectedHint = '';
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

  filteredData(): string[] {
    this.data = this.dataStorage;
    if (this.value.length < 3) {
      return this.data;
    } else {
      const newData = this.data.filter(data =>
        data.toLowerCase().includes(this.value.toLowerCase())
      );
      newData.length === 0 ? (this.alertFlag = true) : (this.alertFlag = false);
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
    return array.toString();
  }

  outputMode(): boolean {
    return this.mode === 'default';
  }

  addItem(): void {
    this.data.push(this.value);
  }

  getStatus(item: string): boolean {
    return this.selectedItems.indexOf(item) != -1;
  }
}
