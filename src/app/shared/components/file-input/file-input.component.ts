import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInputComponent {
  @Input() image?: string;
  @Output() loadFileEvent = new EventEmitter();
  constructor() {}

  onSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target && target.files) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = () => this.loadFileEvent.emit(reader?.result?.toString());
      reader.readAsDataURL(file);
    }
  }

  remove(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.loadFileEvent.emit();
  }
}
