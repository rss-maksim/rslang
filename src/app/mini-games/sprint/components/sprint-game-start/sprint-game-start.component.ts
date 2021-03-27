import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sprint-game-start',
  templateUrl: './sprint-game-start.component.html',
  styleUrls: ['./sprint-game-start.component.scss'],
})
export class SprintGameStartComponent {
  @Output() difficultySelected = new EventEmitter();
  difficulty = 2;

  onDifficultyChange(value: number | null) {
    if (value) {
      this.difficulty = value;
    }
  }

  onStart() {
    this.difficultySelected.emit(this.difficulty);
  }
}
