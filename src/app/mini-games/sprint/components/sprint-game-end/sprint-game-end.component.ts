import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Answer } from 'src/app/core/models/ISprintGame';
import { ITrainedWord } from 'src/app/core/models/ITrainedWord';

@Component({
  selector: 'app-sprint-game-end',
  templateUrl: './sprint-game-end.component.html',
  styleUrls: ['./sprint-game-end.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprintGameEndComponent {
  @Input() trainedWords: ITrainedWord[] = [];
  @Input() gamePoints = 0;
  @Output() resetGame = new EventEmitter();
  @Output() pronounceWord = new EventEmitter();
  ANSWER = {
    CORRECT: Answer.CORRECT,
    WRONG: Answer.WRONG,
  };

  continuePlay(): void {
    this.resetGame.emit();
  }

  countWrongWords(): number {
    return this.trainedWords.filter((word) => word.result === Answer.WRONG).length;
  }

  countCorrectWords(): number {
    return this.trainedWords.filter((word) => word.result === Answer.CORRECT).length;
  }

  onVolumeBtnClick(id: string): void {
    this.pronounceWord.emit(id);
  }

  trackById(index: number, word: ITrainedWord): string {
    return word.id;
  }
}
