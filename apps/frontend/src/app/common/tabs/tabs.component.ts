import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'b-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent {
  @Input()
  type: 'horizontal' | 'vertical' = 'vertical';

  items: string[] = [
    'Основная информация',
    'Оплата и сервис',
    'Дополнительно',
    'Комментарии'
  ];

  selectedItem: string;

  setItem(item: string): void {
    this.selectedItem = item;
    console.log(this.selectedItem);
  }
}
