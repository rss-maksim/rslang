import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/models/state.model';

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

  constructor(private store: Store<AppState>) {}

  guess() {
    this.guessEvent.emit();
  }

  nextWord() {
    this.nextWordEvent.emit();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.guessed) {
      this.nextWordEvent.emit();
    }
    if (event.key === ' ' && !this.guessed) {
      this.guessEvent.emit();
    }
  }
}
