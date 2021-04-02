import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-difficultyy-input',
  templateUrl: './difficultyy-input.component.html',
  styleUrls: ['./difficultyy-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DifficultyyInputComponent {
  difficulty!: number;
  @Output() startWithDifficulty = new EventEmitter<number>();
  constructor() {}

  onDifficultyChange(value: number | null): void {
    if (value !== null) {
      this.difficulty = value;
    }
  }

  start() {
    this.startWithDifficulty.emit(this.difficulty);
  }

  isDisabled(): boolean {
    return typeof this.difficulty === 'number' ? false : true;
  }
}
