import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  IWord,
  loadWords,
  showNextWord,
  playWordSound,
  translationChoosed,
  checkAnswer,
  checkGameOver,
  wrongAnswer,
} from 'src/app/redux/actions/audiochallenge.actions';
import {
  selectAudio,
  selectCurrentWord,
  selectIsChoosed,
  selectWords,
} from 'src/app/redux/selectors/audiochallenge.selectors';
import { AppState } from 'src/app/redux/models/state.model';

@Component({
  selector: 'app-audiochallenge-game',
  templateUrl: './audiochallenge-game.component.html',
  styleUrls: ['./audiochallenge-game.component.scss'],
})
export class AudiochallengeGameComponent implements OnInit {
  currentWord$!: Observable<IWord>;
  audio$!: Observable<HTMLAudioElement>;
  word$!: Observable<IWord[]>;
  words$!: Observable<IWord[]>;
  guessed$!: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadWords());
    this.currentWord$ = this.store.select(selectCurrentWord);
    this.audio$ = this.store.select(selectAudio);
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
