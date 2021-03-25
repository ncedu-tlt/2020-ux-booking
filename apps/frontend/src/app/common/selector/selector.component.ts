import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'b-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorComponent {
  popupItems = false;
  data: string[] = [
    'Только завтрак',
    'Всё включено',
    'Завтрак и ужин',
    'Без питания'
  ];
  selectedItems: string[] = [];
  titleSelector = 'Питание';
  hint = 'Введите или выберите из списка';
  @Input()
  typeMulti: 'multi' | 'default' = 'default';
  @Input()
  adminType: 'admin' | 'default' = 'default';

  showPopup(): void {
    this.popupItems = !this.popupItems;
  }

  showTitle(item: string): void {
    if (this.typeMulti === 'multi') {
      console.log(this.selectedItems);
    } else if (this.typeMulti === 'default' && +this.selectedItems.length < 2) {
      +this.selectedItems.length === 0
        ? this.selectedItems.push(item)
        : (this.selectedItems[0] = item);
      this.popupItems = false;
    }
  }
}
