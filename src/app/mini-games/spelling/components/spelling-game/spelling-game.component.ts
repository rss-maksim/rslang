import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  loadWords,
  playWordSound,
  translationChoosed,
  checkAnswer,
  checkGameOver,
  soundOn,
  soundOf,
} from 'src/app/redux/actions/spelling.actions';
import { selectCurrentWord, selectIsChoosed, selectWords } from 'src/app/redux/selectors/spelling.selectors';
import { AppState } from 'src/app/redux/models/state.model';
import { IWord } from '../../../../core/models/IWord';
import { ISpellingWord } from 'src/app/redux/models/spelling.state.model';
import { SpellingWordComponent } from '../spelling-word/spelling-word.component';
import { ISettings, MiniGamesSettingsService } from 'src/app/services/mini-games-settings.service';

@Component({
  selector: 'app-spelling-game',
  templateUrl: './spelling-game.component.html',
  styleUrls: ['./spelling-game.component.scss'],
})
export class SpellingGameComponent implements OnInit, OnDestroy {
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
  settingsSubscription?: Subscription;
  settings!: ISettings;
  loadingSubscription?: Subscription;
  isLoading = true;

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

    this.loadingSubscription = this.words$.subscribe((words) => {
      if (words?.length > 0) {
        this.isLoading = false;
        this.loadingSubscription?.unsubscribe();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.settingsSubscription) {
      this.settingsSubscription.unsubscribe();
    }
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
