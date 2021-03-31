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
import { IAudiochallengeWord } from 'src/app/redux/models/IAudiochallengeWord';

@Component({
  selector: 'app-audiochallenge-game',
  templateUrl: './audiochallenge-game.component.html',
  styleUrls: ['./audiochallenge-game.component.scss'],
})
export class AudiochallengeGameComponent implements OnInit {
  @Input() difficulty!: number;
  currentWord$!: Observable<IAudiochallengeWord>;
  word$!: Observable<IWord[]>;
  words$!: Observable<IWord[]>;
  guessed$!: Observable<boolean>;
  statsList!: Observable<IAudiochallengeWord[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadWords({ payload: this.difficulty }));
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
