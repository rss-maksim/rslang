import { IWord } from './../../../../core/models/IWord';
import { ChangeDetectionStrategy, Component, HostListener, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-options-input',
  templateUrl: './options-input.component.html',
  styleUrls: ['./options-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsInputComponent {
  @Input() options!: string[];
  @Output() clicked = new EventEmitter<string>();

  constructor() {}

  @HostListener('window:keydown', ['$event']) keyEvent(event: KeyboardEvent) {
    if ([1, 2, 3, 4].includes(+event.key)) {
      this.wordClicked(+event.key);
    }
  }

  trackByFn(index: number) {
    return index;
  }

  wordClicked(indx: number): void {
    this.clicked.emit(this.options[indx - 1]);
  }
}
