import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatRipple } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { MiniGamesHttpService } from 'src/app/services/mini-games-http.service';
import { Answer, GameState, Sound, SprintGame, StreakLevel } from 'src/app/core/models/ISprintGame';
import { getPointsMultiplier, getRandomNumber, getRandomPages, playSound } from './utils/utils';
import { Color, DEFAULT_WORDS_DIFFICULTY, MAX_TRAINED_WORDS } from 'src/app/core/constants/sprint-game';
import { CloseGameDialogComponent } from '../shared/components/close-game-dialog/close-game-dialog.component';
import { ShortTermStatisticsService } from 'src/app/statistics/services/short-term-statistics/short-term-statistics.service';
import { Games } from 'src/app/core/constants/mini-games';
import { catchError } from 'rxjs/operators';

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
    word: '',
    wordIndex: 0,
    wordTranslation: '',
    isTranslationCorrect: true,
    streak: 0,
    points: 0,
    basePoints: 10,
    multiplier: 1,
    isMuted: false,
    isPaused: false,
  };
  loadingWordsMessage = '';
  isStarterCounterShown = true;
  closeDialogSubsription?: Subscription;
  wordsBatch1Subscription?: Subscription;
  wordsBatch2Subscription?: Subscription;
  wordsBatch3Subscription?: Subscription;
  GAMES = Games;
  GAME_STATE = GameState;

  constructor(
    private gameService: MiniGamesHttpService,
    public closeDialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private shortTermStatisticsService: ShortTermStatisticsService,
  ) {}

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    if (this.route.snapshot.data.words) {
      this.game.gameState = GameState.READY;
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

  getWords(difficulty: number = DEFAULT_WORDS_DIFFICULTY): void {
    const [page1, page2, page3] = getRandomPages();
    this.wordsBatch1Subscription = this.gameService
      .getWords({ group: difficulty.toString(), page: page1.toString() })
      .subscribe((words: any) => {
        this.game.words.push(...words);
      });
    this.wordsBatch2Subscription = this.gameService
      .getWords({ group: difficulty.toString(), page: page2.toString() })
      .subscribe((words: any) => {
        this.game.words.push(...words);
      });
    this.wordsBatch3Subscription = this.gameService
      .getWords({ group: difficulty.toString(), page: page3.toString() })
      .subscribe((words: any) => {
        this.game.words.push(...words);
      });
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
      id: this.game.words[this.game.wordIndex].id,
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

      if (!this.game.isMuted) {
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

      if (!this.game.isMuted) {
        playSound(Sound.WRONG);
      }
    }
    this.nextTurn();
  }

  nextTurn(): void {
    if (this.game.trainedWords.length === MAX_TRAINED_WORDS) {
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

  pronounceWord(id?: string): void {
    const wordId = id ?? this.game.words[this.game.wordIndex].id;
    this.gameService.getWordById(wordId).subscribe((word) => playSound(word.audio));
  }

  gameOver(): void {
    this.game.gameState = GameState.OVER;
    this.shortTermStatisticsService.setStatistics(this.game.trainedWords, Games.SPRINT);
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
    this.game.isMuted = !this.game.isMuted;
  }

  openCloseDialog(): void {
    this.game.isPaused = true;
    this.closeDialog.open(CloseGameDialogComponent);
    this.closeDialogSubsription = this.closeDialog.afterAllClosed.subscribe(() => {
      this.game.isPaused = false;
    });
  }

  resetGame(): void {
    this.isStarterCounterShown = true;
    this.game = {
      ...this.game,
      gameState: GameState.SETUP,
      words: [],
      trainedWords: [],
      trainedWordsByIndexes: [],
      streak: 0,
      points: 0,
      basePoints: 10,
      multiplier: 1,
    };
  }
}
