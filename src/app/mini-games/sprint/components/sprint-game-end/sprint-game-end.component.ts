import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Answers } from 'src/app/core/models/ISprintGame';
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

  continuePlay() {
    this.resetGame.emit();
  }

  countWrongWords() {
    return this.trainedWords.filter((word) => word.result === Answers.WRONG).length;
  }

  countCorrectWords() {
    return this.trainedWords.filter((word) => word.result === Answers.CORRECT).length;
  }

  onVolumeBtnClick(id: string) {
    this.pronounceWord.emit(id);
  }

  trackById(index: number, word: ITrainedWord) {
    return word.id;
  }
}
