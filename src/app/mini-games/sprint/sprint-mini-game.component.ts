import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { MiniGamesHttpService } from 'src/app/services/mini-games-http.service';
import { Answers, GameState, Sound, SprintGame, StreakLevel } from 'src/app/core/models/ISprintGame';
import { getPointsMultiplier, getRandomNumber, getRandomPages, isTranslationCorrect, playSound } from './utils/utils';
import { MatRipple } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Color, MAX_TRAINED_WORDS } from 'src/app/core/constants/sprint-game';
import { ActivatedRoute, Router } from '@angular/router';
import { SprintGamePauseExitComponent } from './components/sprint-game-pause-exit/sprint-game-pause-exit.component';
import { Subscription } from 'rxjs';

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

  constructor(
    private http: MiniGamesHttpService,
    public closeDialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    if (this.route.snapshot.data.words) {
      this.game.gameState = GameState.READY;
    }
  }

  ngOnDestroy() {
    if (this.closeDialogSubsription) {
      this.closeDialogSubsription.unsubscribe();
    }
  }

  getWords(difficulty: number) {
    const [page1, page2, page3] = getRandomPages();
    this.http.getWords(difficulty, page1).subscribe((words) => {
      this.game.words.push(...words);
    });
    this.http.getWords(difficulty, page2).subscribe((words) => {
      this.game.words.push(...words);
    });
    this.http.getWords(difficulty, page3).subscribe((words) => {
      this.game.words.push(...words);
    });
    this.game.gameState = GameState.READY;
  }

  getReadyToPlay() {
    this.isStarterCounterShown = false;

    const playGame = () => {
      if (this.game.words.length) {
        this.game.gameState = GameState.PLAY;
        this.nextTurn();
      } else {
        this.loadingWordsMessage = 'Слова загружаются...';
        setTimeout(() => (this.loadingWordsMessage = ''), 1000);
        setTimeout(playGame, 2000);
      }
    };

    playGame();
  }

  handleTurn(answer: string) {
    this.game.trainedWordsByIndexes.push(this.game.wordIndex);

    const trainedWord = {
      id: this.game.words[this.game.wordIndex].id,
      word: this.game.word,
      translation: this.game.wordTranslation,
      timeStamp: Date.now(),
    };

    if (
      (answer === Answers.CORRECT && this.game.isTranslationCorrect) ||
      (answer === Answers.WRONG && !this.game.isTranslationCorrect)
    ) {
      this.game.streak++;
      this.game.multiplier = getPointsMultiplier(this.game.streak);
      this.game.points += this.game.basePoints * this.game.multiplier;
      this.game.trainedWords.push({
        ...trainedWord,
        result: Answers.CORRECT,
      });

      this.launchRipple(Answers.CORRECT);

      if (!this.game.isMuted) {
        if (this.game.streak % 4 === 0 && this.game.streak <= StreakLevel.THIRD) {
          playSound(Sound.LEVELUP);
        } else {
          playSound(Sound.CORRECT);
        }
      }
    } else {
      this.game.streak = 0;
      this.game.multiplier = 1;
      this.game.trainedWords.push({
        ...trainedWord,
        result: Answers.WRONG,
      });

      this.launchRipple(Answers.WRONG);

      if (!this.game.isMuted) playSound(Sound.WRONG);
    }
    this.nextTurn();
  }

  nextTurn() {
    if (this.game.trainedWords.length === MAX_TRAINED_WORDS) {
      this.game.gameState = GameState.OVER;
      return;
    }

    do {
      this.game.wordIndex = getRandomNumber(this.game.words.length);
    } while (this.game.trainedWordsByIndexes.includes(this.game.wordIndex));

    this.game.word = this.game.words[this.game.wordIndex].word;

    if (isTranslationCorrect()) {
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

  pronounceWord() {
    this.http.getWordById(this.game.words[this.game.wordIndex].id).subscribe((word) => playSound(word.audio));
  }

  gameOver() {
    this.game.gameState = GameState.OVER;
  }

  launchRipple(answer: string) {
    const color = answer === Answers.CORRECT ? Color.CORRECT : Color.WRONG;
    if (!this.answerRipple) return;
    const rippleRef = this.answerRipple.launch({
      color,
      persistent: true,
      centered: true,
    });
    rippleRef.fadeOut();
  }

  onMuteClick() {
    this.game.isMuted = !this.game.isMuted;
  }

  openCloseDialog() {
    this.game.isPaused = true;
    this.closeDialog.open(SprintGamePauseExitComponent);
    this.closeDialogSubsription = this.closeDialog.afterAllClosed.subscribe(() => {
      this.game.isPaused = false;
    });
  }
}
