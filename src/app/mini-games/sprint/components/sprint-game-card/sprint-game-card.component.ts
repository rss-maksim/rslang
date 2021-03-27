import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { Sprinter } from 'src/app/core/constants/sprint-game';
import { Answers, KeyboardKeys, StreakLevel } from '../../../../core/models/ISprintGame';

@Component({
  selector: 'app-sprint-game-card',
  templateUrl: './sprint-game-card.component.html',
  styleUrls: ['./sprint-game-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprintGameCardComponent {
  @Input() word = '';
  @Input() translation = '';
  @Input() streak = 0;
  @Input() multiplier = 1;
  @Output() pronounceWord = new EventEmitter();
  @Output() handleTurn = new EventEmitter<string>();
  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
    if (event.key == KeyboardKeys.LEFT) this.onWrongBtnClick();
    else if (event.key == KeyboardKeys.RIGHT) this.onCorrectBtnClick();
  }

  onVolumeBtnClick() {
    this.pronounceWord.emit();
  }

  onWrongBtnClick() {
    this.handleTurn.emit(Answers.WRONG);
  }

  onCorrectBtnClick() {
    this.handleTurn.emit(Answers.CORRECT);
  }

  onStreakChange(streak: number) {
    const streakStatus = {
      firstStar: false,
      secondStar: false,
      thirdStar: false,
      imageSrc: Sprinter.startImageSrc,
    };

    if (streak % 4 >= 1 && streak < StreakLevel.THIRD) streakStatus.firstStar = true;
    if (streak % 4 >= 2 && streak < StreakLevel.THIRD) streakStatus.secondStar = true;
    if (streak % 4 >= 3 && streak < StreakLevel.THIRD) streakStatus.thirdStar = true;

    if (streak >= StreakLevel.THIRD) streakStatus.imageSrc = Sprinter.finishImageSrc;
    else if (streak >= StreakLevel.SECOND) streakStatus.imageSrc = Sprinter.sprintImageSrc;
    else if (streak >= StreakLevel.FIRST) streakStatus.imageSrc = Sprinter.runImageSrc;

    return streakStatus;
  }
}
