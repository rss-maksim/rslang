import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-decision-buttons',
  templateUrl: './decision-buttons.component.html',
  styleUrls: ['./decision-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecisionButtonsComponent {
  @Output() guessEvent = new EventEmitter();
  @Output() nextWordEvent = new EventEmitter();
  @Input() guessed!: boolean | null;

  guess() {
    this.guessEvent.emit();
  }

  nextWord() {
    this.nextWordEvent.emit();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (!this.guessed) {
        this.guessEvent.emit();
      } else {
        this.nextWordEvent.emit();
      }
    }
  }
}
