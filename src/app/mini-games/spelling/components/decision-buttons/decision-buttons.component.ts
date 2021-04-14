import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-spelling-decision-buttons',
  templateUrl: './decision-buttons.component.html',
  styleUrls: ['./decision-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpellingDecisionButtonsComponent {
  @Input() guessed!: boolean | null;
  @Output() guessEvent = new EventEmitter();
  @Output() nextWordEvent = new EventEmitter();

  guess() {
    this.guessEvent.emit();
  }

  nextWord() {
    this.nextWordEvent.emit();
  }
}
