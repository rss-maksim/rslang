import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  loadWords,
  playWordSound,
  translationChoosed,
  checkAnswer,
  checkGameOver,
} from 'src/app/redux/actions/spelling.actions';
import { selectCurrentWord, selectIsChoosed, selectWords } from 'src/app/redux/selectors/spelling.selectors';
import { AppState } from 'src/app/redux/models/state.model';
import { IWord } from '../../../../core/models/IWord';
import { ISpellingWord } from 'src/app/redux/models/spelling.state.model';
import { SpellingWordComponent } from '../spelling-word/spelling-word.component';

@Component({
  selector: 'app-spelling-game',
  templateUrl: './spelling-game.component.html',
  styleUrls: ['./spelling-game.component.scss'],
})
export class SpellingGameComponent implements OnInit {
  @Input() difficulty!: string;
  @Input() page!: string;
  @Input() group!: string;
  @Input() userId!: string | null;
  @Input() filter!: string;
  @ViewChild('spellingWordComponent') spellingWordComponent!: SpellingWordComponent;
  currentWord$!: Observable<ISpellingWord>;
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

  checkWord(currentWord: ISpellingWord) {
    let word = '';
    if (this.spellingWordComponent && this.spellingWordComponent.wordForm) {
      const children: HTMLInputElement[] = this.spellingWordComponent.wordForm.nativeElement.children;
      [...children].forEach((char) => {
        word += char.value;
      });
      word.toLowerCase() === currentWord.word.toLowerCase()
        ? this.spellingWordComponent.wordForm?.nativeElement.classList.add('spelling__correct')
        : this.spellingWordComponent.wordForm?.nativeElement.classList.add('spelling__wrong');
    }
    this.store.dispatch(checkAnswer({ payload: word }));
    this.store.dispatch(translationChoosed());
  }

  nextWord() {
    this.store.dispatch(checkGameOver());
  }

  checkAnswer(word: string) {
    this.store.dispatch(translationChoosed());
    this.store.dispatch(checkAnswer({ payload: word }));
  }
}
