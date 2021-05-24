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
  id: string;

  @Output()
  filesEvent: EventEmitter<File> = new EventEmitter<File>();

  filePath: string;

  changeValue(event: Event): void {
    const file: File = (event.target as HTMLInputElement).files.item(0);
    this.filesEvent.emit(file);
    this.filePath = (event.target as HTMLInputElement).value;
  }
}
