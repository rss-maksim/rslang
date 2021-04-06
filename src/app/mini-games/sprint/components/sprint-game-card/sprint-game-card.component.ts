import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { Sprinter } from 'src/app/core/constants/sprint-game';
import { KeyboardKey, StreakLevel, StreakStatus } from '../../../../core/models/ISprintGame';
import { Answer } from 'src/app/core/models/IAnswer';

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
    if (event.key === KeyboardKey.LEFT) {
      this.onWrongBtnClick();
    } else if (event.key === KeyboardKey.RIGHT) {
      this.onCorrectBtnClick();
    }
  }

  onVolumeBtnClick(): void {
    this.pronounceWord.emit();
  }

  onWrongBtnClick(): void {
    this.handleTurn.emit(Answer.WRONG);
  }

  onCorrectBtnClick(): void {
    this.handleTurn.emit(Answer.CORRECT);
  }

  onStreakChange(streak: number): StreakStatus {
    const streakStatus: StreakStatus = {
      firstStar: false,
      secondStar: false,
      thirdStar: false,
      imageSrc: Sprinter.startImageSrc,
    };

    if (streak % 4 >= 1 && streak < StreakLevel.THIRD) {
      streakStatus.firstStar = true;
    }
    if (streak % 4 >= 2 && streak < StreakLevel.THIRD) {
      streakStatus.secondStar = true;
    }
    if (streak % 4 >= 3 && streak < StreakLevel.THIRD) {
      streakStatus.thirdStar = true;
    }

    if (streak >= StreakLevel.THIRD) {
      streakStatus.imageSrc = Sprinter.finishImageSrc;
    } else if (streak >= StreakLevel.SECOND) {
      streakStatus.imageSrc = Sprinter.sprintImageSrc;
    } else if (streak >= StreakLevel.FIRST) {
      streakStatus.imageSrc = Sprinter.runImageSrc;
    }

    return streakStatus;
  }
}
