import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Answer } from 'src/app/core/models/IAnswer';
import { GameState, ISavannahGame } from 'src/app/core/models/ISavannahGame';
import { ITrainedWord } from 'src/app/core/models/ITrainedWord';
import { IWord } from 'src/app/core/models/IWord';
import { MiniGamesHttpService } from 'src/app/services/mini-games-http.service';
import { Sound } from '../../constants/savannah.game';
import {
  getRandomFrom,
  getRandomNumbers,
  getRandomsFromArray,
  getTranslations,
  shuffleArray,
  sound,
} from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class SavannahService implements OnDestroy {
  game$ = new Observable<ISavannahGame>((observer) => {
    observer.next(this.game);
  });
  game: ISavannahGame = {
    gameState: GameState.SETTING,
    userId: null,
    learningWords: [],
    totalWordsAmount: 0,
    randomTranslations: [],
    trainedWords: [],
    id: '',
    word: '',
    audio: '',
    wordTranslation: '',
    answers: [],
    isAnswerCorrect: true,
    lifes: 5,
    progress: 0,
    points: 0,
    isMuted: false,
    isPaused: false,
    queryParams: {},
  };
  constructor(private gamesService: MiniGamesHttpService) {}
  wordsBatch$?: Subscription;
  translationsBatch$?: Subscription;
  translationsBatch$2?: Subscription;
  translationsBatch$3?: Subscription;

  ngOnDestroy() {
    this.wordsBatch$?.unsubscribe();
    this.translationsBatch$?.unsubscribe();
    this.translationsBatch$2?.unsubscribe();
    this.translationsBatch$3?.unsubscribe();
  }

  setUserID(id: string | null) {
    this.game.userId = id;
  }

  setQueryParams(params: any) {
    this.game.queryParams.page = params['page'];
    this.game.queryParams.group = params['group'];
    this.game.queryParams.filter = params['filter'];
  }

  setGameState(state: GameState) {
    this.game.gameState = state;
  }

  setPause(pause: boolean) {
    this.game.isPaused = pause;
  }

  getWords(difficulty: number, page?: string) {
    let [page1, page2, page3, page4] = getRandomNumbers(4, page);
    page1 = page !== undefined ? +page : page1;

    this.wordsBatch$ = this.gamesService
      .getWords({ group: `${difficulty}`, page: `${page1}` })
      .subscribe((words: IWord[]) => {
        this.game.learningWords.push(...words);
        this.game.totalWordsAmount = words.length;
      });
    this.translationsBatch$ = this.gamesService
      .getWords({ group: `${difficulty}`, page: `${page2}` })
      .subscribe((words: IWord[]) => {
        this.game.randomTranslations.push(...getTranslations(words));
      });
    this.translationsBatch$2 = this.gamesService
      .getWords({ group: `${difficulty}`, page: `${page3}` })
      .subscribe((words: IWord[]) => {
        this.game.randomTranslations.push(...getTranslations(words));
      });
    this.translationsBatch$3 = this.gamesService
      .getWords({ group: `${difficulty}`, page: `${page4}` })
      .subscribe((words: IWord[]) => {
        this.game.randomTranslations.push(...getTranslations(words));
      });

    this.game.gameState = GameState.PREP;
  }

  nextWord(): void {
    if (!this.game.learningWords.length || this.game.lifes === 0) {
      this.game.isMuted ? null : sound(this.game.lifes ? Sound.WIN : Sound.LOSE);
      this.finishGame();
      return;
    }
    const wordIndex = getRandomFrom(this.game.learningWords.length - 1);
    this.game.id = this.game.learningWords[wordIndex].id;
    this.game.word = this.game.learningWords[wordIndex].word;
    this.game.audio = this.game.learningWords[wordIndex].audio;
    this.game.wordTranslation = this.game.learningWords.splice(wordIndex, 1)[0].wordTranslate;
    this.game.answers = shuffleArray([
      ...getRandomsFromArray(this.game.randomTranslations, 3),
      this.game.wordTranslation,
    ]);
  }

  setAnswer(isAnswerCorrect: boolean) {
    this.game.isAnswerCorrect = isAnswerCorrect;
    const progressStep = 100 / this.game.totalWordsAmount;
    this.game.progress += progressStep;

    const trained: ITrainedWord = {
      id: this.game.id,
      word: this.game.word,
      translation: this.game.wordTranslation,
      timeStamp: Date.now(),
      result: isAnswerCorrect ? Answer.CORRECT : Answer.WRONG,
      audio: this.game.audio,
    };
    this.game.trainedWords = [...this.game.trainedWords, trained];

    if (!isAnswerCorrect) {
      this.game.lifes -= 1;
    } else {
      this.game.points += 1;
    }
    setTimeout(() => {
      this.nextWord();
    }, 0);
  }

  playSound(answerCorrect: boolean) {
    this.game.isMuted ? null : sound(answerCorrect ? Sound.RIGHT : Sound.WRONG);
  }

  finishGame() {
    this.game.gameState = GameState.FINISH;
  }

  gameReset() {
    this.game.gameState = GameState.SETTING;
    this.game.learningWords = [];
    this.game.randomTranslations = [];
    this.game.trainedWords = [];
    this.game.id = '';
    this.game.word = '';
    this.game.audio = '';
    this.game.wordTranslation = '';
    this.game.answers = [];
    this.game.lifes = 5;
    this.game.progress = 0;
    this.game.points = 0;
  }
}
