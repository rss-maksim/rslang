import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import { ASSETS_API_URL, Games } from 'src/app/core/constants/mini-games';
import { ITrainedWord } from 'src/app/core/models/ITrainedWord';
import { Answer } from 'src/app/core/models/ISprintGame';
import { ShortTermStatisticsService } from 'src/app/statistics/services/short-term-statistics/short-term-statistics.service';
import { LongTermStatisticsService } from 'src/app/statistics/services/long-term-statistics/long-term-statistics.service';

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.scss'],
})
export class EndGameComponent implements OnInit, OnDestroy {
  @Input() trainedWords!: ITrainedWord[] | null;
  @Input() gamePoints!: number | null;
  @Input() game!: Games;
  audio = new Audio();
  answer = Answer;
  rightWords: ITrainedWord[] = [];
  wrongWords: ITrainedWord[] = [];
  @Output() closeGameEvent = new EventEmitter();

  constructor(
    private shortTermStatisticsService: ShortTermStatisticsService,
    private longTermStatisticsService: LongTermStatisticsService,
  ) {}

  playSound(path: string) {
    this.audio.src = `${ASSETS_API_URL}/${path}`;
    this.audio.play();
  }

  trackByIdentity = (index: number, item: any) => item;

  closeGame() {
    this.closeGameEvent.emit();
  }

  ngOnInit() {
    if (this.trainedWords && this.trainedWords.length > 0) {
      this.rightWords = this.trainedWords.filter((word) => word.result === Answer.CORRECT);
      this.wrongWords = this.trainedWords.filter((word) => word.result === Answer.WRONG);
    }
  }

  ngOnDestroy() {
    if (this.trainedWords && this.trainedWords.length > 0) {
      this.shortTermStatisticsService.setStatistics(this.trainedWords, this.game);
      this.longTermStatisticsService.setStatistics(this.trainedWords, this.game);
    }
  }
}
