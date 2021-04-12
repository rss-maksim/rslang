import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatRipple } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { MiniGamesHttpService } from 'src/app/services/mini-games-http.service';
import { GameState, Sound, SprintGame, StreakLevel } from 'src/app/core/models/ISprintGame';
import { Answer } from 'src/app/core/models/IAnswer';
import { getPointsMultiplier, getRandomNumber, getRandomPages, playSound } from './utils/utils';
import { Color } from 'src/app/core/constants/sprint-game';
import { CloseGameDialogComponent } from '../shared/components/close-game-dialog/close-game-dialog.component';
import { Games, ASSETS_API_URL } from 'src/app/core/constants/mini-games';
import { UserService } from 'src/app/core/services/user.service';
import { DEFAULT_DIFFICULTY_LEVEL } from 'src/app/core/constants/common';
import { ISettings, MiniGamesSettingsService } from 'src/app/services/mini-games-settings.service';

@Component({
  selector: 'app-sprint-mini-game',
  templateUrl: './sprint-mini-game.component.html',
  styleUrls: ['./sprint-mini-game.component.scss'],
})
export class SprintMiniGameComponent implements OnInit, OnDestroy {
  @ViewChild('answerRipple', { read: MatRipple }) answerRipple!: MatRipple;
  game: SprintGame = {
    gameState: GameState.SETUP,
    words: [],
    trainedWords: [],
    trainedWordsByIndexes: [],
    maxTrainedWords: 0,
    word: '',
    wordIndex: 0,
    wordTranslation: '',
    isTranslationCorrect: true,
    streak: 0,
    points: 0,
    basePoints: 10,
    multiplier: 1,
    isPaused: false,
  };
  loadingWordsMessage = '';
  isStarterCounterShown = true;
  closeDialogSubsription?: Subscription;
  wordsBatch1Subscription?: Subscription;
  wordsBatch2Subscription?: Subscription;
  wordsBatch3Subscription?: Subscription;
  settingsSubscription$?: Subscription;
  GAMES = Games;
  GAME_STATE = GameState;
  DEFAULT_DIFFICULTY_LEVEL = DEFAULT_DIFFICULTY_LEVEL;
  hasDifficultySlider = true;
  group?: string;
  difficulty?: string;
  page?: string;
  filter!: string;
  settings!: ISettings;

  constructor(
    private gameService: MiniGamesHttpService,
    public closeDialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private settingsService: MiniGamesSettingsService,
  ) {}

  ngOnInit() {
    this.settingsSubscription$ = this.settingsService.gameSettings.subscribe((state) => {
      this.settings = state;
    });
    const { group, page, filter } = this.route.snapshot.queryParams;
    this.filter = filter;
    if (group !== undefined && page !== undefined) {
      this.hasDifficultySlider = false;
      this.group = group;
      this.page = page;
    }
  }

  ngOnDestroy() {
    if (this.closeDialogSubsription) {
      this.closeDialogSubsription.unsubscribe();
    }
    if (this.wordsBatch1Subscription) {
      this.wordsBatch1Subscription.unsubscribe();
    }
    if (this.wordsBatch2Subscription) {
      this.wordsBatch2Subscription.unsubscribe();
    }
    if (this.wordsBatch3Subscription) {
      this.wordsBatch3Subscription.unsubscribe();
    }
  }

  getWords(difficulty: number | undefined): void {
    let groupToGet = '';
    let page1ToGet = '';
    let page2ToGet = '';
    let page3ToGet = '';

    if (difficulty !== undefined) {
      this.difficulty = difficulty.toString();
      groupToGet = difficulty.toString();
    }

    if (this.group !== undefined) {
      groupToGet = this.group;
    }

    if (this.page !== undefined) {
      page1ToGet = this.page;
      page2ToGet = +this.page - 1 >= 0 ? (+this.page - 1).toString() : '';
      page3ToGet = +this.page - 2 >= 0 ? (+this.page - 2).toString() : '';
    } else {
      const [page1, page2, page3] = getRandomPages();
      page1ToGet = page1.toString();
      page2ToGet = page2.toString();
      page3ToGet = page3.toString();
    }

    const userId = this.userService.getUserId();

    this.wordsBatch1Subscription = this.gameService
      .getWords({ group: groupToGet, page: page1ToGet, filter: this.filter, userId: userId || undefined })
      .subscribe((words: any) => {
        if (words[0].paginatedResults) {
          words = words[0].paginatedResults;
        }
        this.game.maxTrainedWords += words.length;
        this.game.words.push(...words);
      });

    if (page2ToGet) {
      this.wordsBatch2Subscription = this.gameService
        .getWords({ group: groupToGet, page: page2ToGet, filter: this.filter, userId: userId || undefined })
        .subscribe((words: any) => {
          if (words[0].paginatedResults) {
            words = words[0].paginatedResults;
          }
          this.game.maxTrainedWords += words.length;
          this.game.words.push(...words);
        });
    }

    if (page3ToGet) {
      this.wordsBatch3Subscription = this.gameService
        .getWords({ group: groupToGet, page: page3ToGet, filter: this.filter, userId: userId || undefined })
        .subscribe((words: any) => {
          if (words[0].paginatedResults) {
            words = words[0].paginatedResults;
          }
          this.game.maxTrainedWords += words.length;
          this.game.words.push(...words);
        });
    }

    this.game.gameState = GameState.READY;
  }

  getReadyToPlay(): void {
    this.isStarterCounterShown = false;

    const playGame = () => {
      if (this.game.words.length) {
        this.game.gameState = GameState.PLAY;
        this.nextTurn();
      } else {
        this.loadingWordsMessage = 'Слова загружаются...';
        setTimeout(() => {
          this.loadingWordsMessage = '';
        }, 1000);
        setTimeout(playGame, 2000);
      }
    };

    playGame();
  }

  handleTurn(answer: string): void {
    this.game.trainedWordsByIndexes.push(this.game.wordIndex);

    const trainedWord = {
      id: this.game.words[this.game.wordIndex]._id || this.game.words[this.game.wordIndex].id,
      word: this.game.word,
      translation: this.game.wordTranslation,
      timeStamp: Date.now(),
      audio: this.game.words[this.game.wordIndex].audio,
    };

    if (
      (answer === Answer.CORRECT && this.game.isTranslationCorrect) ||
      (answer === Answer.WRONG && !this.game.isTranslationCorrect)
    ) {
      this.game.streak += 1;
      this.game.multiplier = getPointsMultiplier(this.game.streak);
      this.game.points += this.game.basePoints * this.game.multiplier;
      this.game.trainedWords.push({
        ...trainedWord,
        result: Answer.CORRECT,
      });

      this.launchRipple(Answer.CORRECT);

      if (!this.settings.isMuted) {
        const soundToPlay =
          this.game.streak % 4 === 0 && this.game.streak <= StreakLevel.THIRD ? Sound.LEVELUP : Sound.CORRECT;
        playSound(soundToPlay);
        playSound(soundToPlay);
      }
    } else {
      this.game.streak = 0;
      this.game.multiplier = 1;
      this.game.trainedWords.push({
        ...trainedWord,
        result: Answer.WRONG,
        translation: this.game.words[this.game.wordIndex].wordTranslate,
      });

      this.launchRipple(Answer.WRONG);

      if (!this.settings.isMuted) {
        playSound(Sound.WRONG);
      }
    }
    this.nextTurn();
  }

  nextTurn(): void {
    if (this.game.trainedWords.length === this.game.maxTrainedWords) {
      this.gameOver();
      return;
    }

    do {
      this.game.wordIndex = getRandomNumber(this.game.words.length);
    } while (this.game.trainedWordsByIndexes.includes(this.game.wordIndex));

    this.game.word = this.game.words[this.game.wordIndex].word;

    if (Math.random() >= 0.5) {
      this.game.isTranslationCorrect = true;
      this.game.wordTranslation = this.game.words[this.game.wordIndex].wordTranslate;
    } else {
      this.game.isTranslationCorrect = false;
      let anotherWordIndex = getRandomNumber(this.game.words.length);

      while (anotherWordIndex === this.game.wordIndex) {
        anotherWordIndex = getRandomNumber(this.game.words.length);
      }
      this.game.wordTranslation = this.game.words[anotherWordIndex].wordTranslate;
    }
  }

  pronounceWord(audioSrc: string): void {
    const audio = new Audio(`${ASSETS_API_URL}/${audioSrc}`);
    audio.play();
  }

  gameOver(): void {
    this.game.gameState = GameState.OVER;
  }

  launchRipple(answer: string): void {
    const color = answer === Answer.CORRECT ? Color.CORRECT : Color.WRONG;
    if (!this.answerRipple) {
      return;
    }

    const rippleRef = this.answerRipple.launch({
      color,
      persistent: true,
      centered: true,
    });
    rippleRef.fadeOut();
  }

  onMuteClick(): void {
    this.settingsService.changeMutedState();
  }

  openCloseDialog(): void {
    if (this.game.gameState === GameState.PLAY) {
      this.game.isPaused = true;
      this.closeDialog.open(CloseGameDialogComponent);
      this.closeDialogSubsription = this.closeDialog.afterAllClosed.subscribe(() => {
        this.game.isPaused = false;
      });
    } else {
      this.router.navigate(['mini-games']);
    }
  }

  resetGame(): void {
    this.isStarterCounterShown = true;
    this.game = {
      ...this.game,
      gameState: GameState.SETUP,
      words: [],
      trainedWords: [],
      trainedWordsByIndexes: [],
      maxTrainedWords: 0,
      streak: 0,
      points: 0,
      basePoints: 10,
      multiplier: 1,
    };
  }
}
