import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import { ASSETS_API_URL, Games } from 'src/app/core/constants/mini-games';
import { ITrainedWord } from 'src/app/core/models/ITrainedWord';
import { Answer } from 'src/app/core/models/IAnswer';
import { ShortTermStatisticsService } from 'src/app/statistics/services/short-term-statistics/short-term-statistics.service';
import { LongTermStatisticsService } from 'src/app/statistics/services/long-term-statistics/long-term-statistics.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/models/state.model';
import { updateUserWords } from 'src/app/redux/actions/textbooks.actions';
import { Subscription } from 'rxjs';
import { selectIsAuthorized } from 'src/app/redux/selectors/user.selector';

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
  authSubscribition!: Subscription;
  isAuthorized!: boolean;
  @Output() closeGameEvent = new EventEmitter();

  constructor(
    private shortTermStatisticsService: ShortTermStatisticsService,
    private longTermStatisticsService: LongTermStatisticsService,
    private store: Store<AppState>,
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
    this.authSubscribition = this.store.select(selectIsAuthorized).subscribe((value) => (this.isAuthorized = value));
    if (this.trainedWords && this.trainedWords.length > 0) {
      this.rightWords = this.trainedWords.filter((word) => word.result === Answer.CORRECT);
      this.wrongWords = this.trainedWords.filter((word) => word.result === Answer.WRONG);
    }
  }

  markAsDeleted(index: number) {
    if (this.trainedWords) {
      this.trainedWords = this.trainedWords.map((word, ind) => {
        if (index === ind) {
          return { ...word, userWord: { ...word.userWord, difficulty: 'deleted' } };
        }
        return word;
      });
    }
  }

  ngOnDestroy() {
    if (this.trainedWords && this.trainedWords.length > 0) {
      this.shortTermStatisticsService.setStatistics(this.trainedWords, this.game);
      if (this.isAuthorized) {
        this.store.dispatch(updateUserWords({ payload: this.trainedWords }));
        this.longTermStatisticsService.setStatistics(this.trainedWords, this.game);
      }
    }
    this.authSubscribition.unsubscribe();
  }
}
