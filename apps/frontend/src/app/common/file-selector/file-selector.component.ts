import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
@Component({
  selector: 'b-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileSelectorComponent {
  @Input()
  text: string;
  @Input()
  icon: boolean;
  @Input()
  id: string;
  @Output()
  filesEvent: EventEmitter<FileList> = new EventEmitter<FileList>();
  filePath: string;
  changeValue(event: Event): void {
    const valueEvent = (event.target as HTMLInputElement).files;
    this.filesEvent.emit(valueEvent);
    this.filePath = (event.target as HTMLInputElement).value;
  }
}
