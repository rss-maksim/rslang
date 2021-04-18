import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  loadWords,
  playWordSound,
  translationChoosed,
  checkAnswer,
  checkGameOver,
  wrongAnswer,
  soundOf,
  soundOn,
  audiochallengeEnded,
} from 'src/app/redux/actions/audiochallenge.actions';
import { selectCurrentWord, selectIsChoosed, selectWords } from 'src/app/redux/selectors/audiochallenge.selectors';
import { AppState } from 'src/app/redux/models/state.model';
import { IWord } from '../../../../core/models/IWord';
import { IAudiochallengeWord } from 'src/app/redux/models/audiochallenge.state.model';
import { ISettings, MiniGamesSettingsService } from 'src/app/services/mini-games-settings.service';

@Component({
  selector: 'app-audiochallenge-game',
  templateUrl: './audiochallenge-game.component.html',
  styleUrls: ['./audiochallenge-game.component.scss'],
})
export class AudiochallengeGameComponent implements OnInit, OnDestroy {
  @Input() difficulty!: string;
  @Input() page!: string;
  @Input() group!: string;
  @Input() userId!: string | null;
  @Input() filter!: string;
  currentWord$!: Observable<IAudiochallengeWord>;
  word$!: Observable<IWord[]>;
  words$!: Observable<IWord[]>;
  guessed$!: Observable<boolean>;
  settingsSubscription?: Subscription;
  settings!: ISettings;

  constructor(private store: Store<AppState>, private settingsService: MiniGamesSettingsService) {}

  ngOnInit(): void {
    this.settingsSubscription = this.settingsService.gameSettings.subscribe((state) => {
      this.settings = state;
      if (this.settings.isMuted) {
        this.store.dispatch(soundOf());
      } else {
        this.store.dispatch(soundOn());
      }
    });
    this.store.dispatch(
      loadWords({
        payload: {
          group: this.difficulty || this.group,
          page: this.page,
          userId: this.userId || undefined,
          filter: this.filter,
        },
      }),
    );
    this.currentWord$ = this.store.select(selectCurrentWord);
    this.words$ = this.store.select(selectWords);
    this.guessed$ = this.store.select(selectIsChoosed);
  }

  ngOnDestroy(): void {
    if (this.settingsSubscription) {
      this.settingsSubscription.unsubscribe();
    }
  }

  playSound() {
    this.store.dispatch(playWordSound());
  }

  skipWord() {
    this.store.dispatch(translationChoosed());
    this.store.dispatch(wrongAnswer());
  }

  nextWord() {
    this.store.dispatch(checkGameOver());
  }

  checkAnswer(translation: string) {
    this.store.dispatch(translationChoosed());
    this.store.dispatch(checkAnswer({ payload: translation }));
  }
}
