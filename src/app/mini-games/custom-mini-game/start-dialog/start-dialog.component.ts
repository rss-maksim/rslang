import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-start-dialog',
  templateUrl: './start-dialog.component.html',
  styleUrls: ['./start-dialog.component.scss'],
})
export class StartDialogComponent {
  @Output() difficultyLevel = new EventEmitter<number>();
  @Output() numOfRounds = new EventEmitter<number>();
  @Output() roundLength = new EventEmitter<number>();
  @Output() startGame = new EventEmitter();

  constructor() {}

  onStartGame(): void {
    this.startGame.emit();
  }

  onSetDifficultyLevel(value: number | null): void {
    if (value) {
      this.difficultyLevel.emit(value);
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
