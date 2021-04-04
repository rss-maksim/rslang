import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { DEFAULT_WORDS_DIFFICULTY } from 'src/app/core/constants/sprint-game';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartGameComponent {
  @Input() hasDifficultySlider = true;
  @Output() difficultySelected = new EventEmitter();
  difficulty = DEFAULT_WORDS_DIFFICULTY;

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
}
