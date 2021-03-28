import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { DEFAULT_WORDS_DIFFICULTY } from 'src/app/core/constants/sprint-game';

@Component({
  selector: 'app-sprint-game-start',
  templateUrl: './sprint-game-start.component.html',
  styleUrls: ['./sprint-game-start.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprintGameStartComponent {
  @Output() difficultySelected = new EventEmitter();
  difficulty = DEFAULT_WORDS_DIFFICULTY;

  onDifficultyChange(value: number | null): void {
    if (value !== null) {
      this.difficulty = value;
    }
  }

  onStart(): void {
    this.difficultySelected.emit(this.difficulty);
  }
}
