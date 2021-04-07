import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  loadWords,
  playWordSound,
  translationChoosed,
  checkAnswer,
  checkGameOver,
  wrongAnswer,
} from 'src/app/redux/actions/audiochallenge.actions';
import { selectCurrentWord, selectIsChoosed, selectWords } from 'src/app/redux/selectors/audiochallenge.selectors';
import { AppState } from 'src/app/redux/models/state.model';
import { IWord } from '../../../../core/models/IWord';
import { IAudiochallengeWord } from 'src/app/redux/models/audiochallenge.state.model';

@Component({
  selector: 'app-audiochallenge-game',
  templateUrl: './audiochallenge-game.component.html',
  styleUrls: ['./audiochallenge-game.component.scss'],
})
export class AudiochallengeGameComponent implements OnInit {
  @Input() difficulty!: string;
  @Input() page!: string;
  @Input() group!: string;
  @Input() userId!: string | null;
  @Input() filter!: string;
  currentWord$!: Observable<IAudiochallengeWord>;
  word$!: Observable<IWord[]>;
  words$!: Observable<IWord[]>;
  guessed$!: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
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
