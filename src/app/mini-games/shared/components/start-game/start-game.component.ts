import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Games } from 'src/app/core/constants/mini-games';

import { DEFAULT_WORDS_DIFFICULTY } from 'src/app/core/constants/sprint-game';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartGameComponent {
  @Input() hasDifficultySlider = true;
  @Input() gameName = '';
  @Input() textColor = 'black';
  @Output() difficultySelected = new EventEmitter();
  @Output() numOfRounds = new EventEmitter<number>();
  @Output() roundLength = new EventEmitter<number>();
  difficulty = DEFAULT_WORDS_DIFFICULTY;
  GAMES = Games;

  onDifficultyChange(value: number | null): void {
    if (value !== null) {
      this.difficulty = value;
    }
  }

  onStart(): void {
    if (this.hasDifficultySlider) {
      this.difficultySelected.emit(this.difficulty);
    } else {
      this.difficultySelected.emit(undefined);
    }
  }

  onSetNumOfRounds(value: number | null): void {
    if (value) {
      this.numOfRounds.emit(value);
    }
  }

  onSetRoundLength(value: number | null): void {
    if (value) {
      this.roundLength.emit(value);
    }
  }
}
