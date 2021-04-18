import { SavannahService } from './../../services/savannah.service';
import { SavannahMiniGameComponent } from './../../pages/savannah-mini-game/savannah-mini-game.component';
import { SlidingWordComponent } from './../sliding-word/sliding-word.component';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { sound } from '../../utils/utils';
import { Sound } from 'src/app/mini-games/constants/savannah.game';

@Component({
  selector: 'app-main-actions',
  templateUrl: './main-actions.component.html',
  styleUrls: ['./main-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainActionsComponent {
  @Input() word!: string;
  @Input() translation!: string;
  @Input() answers!: string[];
  @Input() lifes!: number;
  @Input() progress!: number;
  @Output() answered = new EventEmitter<boolean>();
  @ViewChild(SlidingWordComponent) private wordComponent!: SlidingWordComponent;
  isAnswerCorrect!: boolean;
  constructor(private savannahService: SavannahService) {}

  wordClicked(clickedWord: string): void {
    this.isAnswerCorrect = clickedWord === this.translation;
    this.savannahService.playSound(this.isAnswerCorrect);
    this.wordComponent.animate(this.isAnswerCorrect);
  }

  wordGone(answer: boolean): void {
    this.answered.emit(answer);
  }
}
