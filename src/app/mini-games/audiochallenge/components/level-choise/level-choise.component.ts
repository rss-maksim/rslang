import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-audiochallenge-level-choise',
  templateUrl: './level-choise.component.html',
  styleUrls: ['./level-choise.component.scss'],
})
export class LevelChoiseComponent {
  @Output() difficultySelected = new EventEmitter();
  difficulty = 2;

  onDifficultyChange(value: number | null): void {
    if (value !== null) {
      this.difficultySelected.emit(value);
    }
  }
}
