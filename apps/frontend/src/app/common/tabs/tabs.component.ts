import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'b-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent {
  @Input()
  type: 'horizontal' | 'vertical' = 'vertical';

  @Input()
  items: { url: string; name: string }[] = [];

  @Input()
  selectedItem: string;

  @Output()
  selectedEvent: EventEmitter<string> = new EventEmitter<string>();

  setItem(item: string): void {
    this.selectedItem = item;
    this.selectedEvent.emit(item);
  }
}
