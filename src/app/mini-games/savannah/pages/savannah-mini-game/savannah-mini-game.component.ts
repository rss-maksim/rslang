import { ActivatedRoute } from '@angular/router';
import { ITrainedWord } from 'src/app/core/models/ITrainedWord';
import { IWord } from './../../../../core/models/IWord';
import { Subscription } from 'rxjs';
import { GameState, ISavannahGame } from './../../../../core/models/ISavannahGame';
import { MiniGamesHttpService } from './../../../../services/mini-games-http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  getRandomFrom,
  getRandomNumbers,
  getRandomsFromArray,
  getTranslations,
  shuffleArray,
  sound,
} from '../../utils/utils';
import { Answer } from 'src/app/core/models/ISprintGame';
import { Sound } from 'src/app/mini-games/constants/savannah.game';
import { Games } from 'src/app/core/constants/mini-games';
import { MatDialog } from '@angular/material/dialog';
import { CloseGameDialogComponent } from 'src/app/mini-games/shared/components/close-game-dialog/close-game-dialog.component';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-savannah-mini-game',
  templateUrl: './savannah-mini-game.component.html',
  styleUrls: ['./savannah-mini-game.component.scss'],
})
export class SavannahMiniGameComponent implements OnInit, OnDestroy {
  gameState = GameState;
  games = Games;
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
  constructor(
    private gamesService: MiniGamesHttpService,
    public closeDialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}
  closeDialogSubsription?: Subscription;
  wordsBatch$?: Subscription;
  translationsBatch$?: Subscription;
  translationsBatch$2?: Subscription;
  translationsBatch$3?: Subscription;
  routeSubscription$?: Subscription;

  ngOnInit() {
    this.game.userId = this.userService.getUserId();
    this.routeSubscription$ = this.route.queryParams.subscribe((params: any) => {
      this.game.queryParams.page = params['page'];
      this.game.queryParams.group = params['group'];
      this.game.queryParams.filter = params['filter'];

      if (!!Object.keys(params).length) {
        this.getWords(params['group'], params['page']);
      }
    });
  }

  ngOnDestroy(): void {
    this.wordsBatch$?.unsubscribe();
    this.translationsBatch$?.unsubscribe();
    this.translationsBatch$2?.unsubscribe();
    this.translationsBatch$3?.unsubscribe();
    this.routeSubscription$?.unsubscribe();
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

  startToPlay() {
    this.game.gameState = GameState.PLAY;
    this.nextWord();
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

  answered(isAnswerCorrect: boolean) {
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

  finishGame() {
    this.game.gameState = this.gameState.FINISH;
  }

  openCloseDialog() {
    this.game.isPaused = true;
    this.closeDialog.open(CloseGameDialogComponent);
    this.closeDialogSubsription = this.closeDialog.afterAllClosed.subscribe(() => {
      this.game.isPaused = false;
    });
  }

  resetGame() {
    this.game = {
      ...this.game,
      gameState: GameState.SETTING,
      learningWords: [],
      randomTranslations: [],
      trainedWords: [],
      id: '',
      word: '',
      audio: '',
      wordTranslation: '',
      answers: [],
      lifes: 5,
      progress: 0,
      points: 0,
    };
  }
}
