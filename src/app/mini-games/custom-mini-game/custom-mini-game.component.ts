import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, timer } from 'rxjs';
import { IWord } from 'src/app/core/models/IWord';
import { ITrainedWord } from 'src/app/core/models/ITrainedWord';
import { MiniGamesHttpService } from 'src/app/services/mini-games-http.service';
import { CloseGameDialogComponent } from '../shared/components/close-game-dialog/close-game-dialog.component';
import { ShuffleService } from './services/shuffle.service';
import { SoundService } from './services/sound.service';
import { Games } from 'src/app/core/constants/mini-games';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { waitForAsync } from '@angular/core/testing';
import { ThemeService } from 'ng2-charts';
import { Answer } from 'src/app/core/models/IAnswer';

@Component({
  selector: 'app-custom-mini-game',
  templateUrl: './custom-mini-game.component.html',
  styleUrls: ['./custom-mini-game.component.scss'],
})
export class CustomMiniGameComponent implements OnInit, OnDestroy {
  sourceArray: IWord[] = [];
  trainedWords: ITrainedWord[] = [];
  currentWord?: string;
  currentWordTranslation?: string;
  scrambledWordAsArray?: string[];
  previousScrambledWord?: string;
  scrambledWord?: string;
  movesCountdownCounter = 0;
  currentWordIndex = 0;
  countdownTimer = 0;
  tick = 1_000;
  roundLength = 15; // настраиваемая длина раунда в игре в тиках
  countDown?: Subscription;
  currentRound = this.currentWordIndex + 1;
  numberOfGameRounds = 10; // настраиваемое количество раундов в игре
  difficultyLevel = 1; // настраиваемая сложность игры
  roundsLeft = 0;
  isGameStarted = false;
  isGamePaused = false;
  isSoundOn = false;
  isRoundOver = false;
  isGameOver = false;
  errorsCounter = 0;
  srcCommPart = '../../../assets/images/mini-games/custom-mini-game/hangman_stage';
  imageSrc = this.srcCommPart + this.errorsCounter + '.png';
  gameOverSoundDelay = 1_000;
  isResultsShown = false;
  getWords?: Subscription;
  games = Games;
  userId?: string | null;
  page?: string | undefined;
  group?: string | undefined;
  filter?: string | undefined;
  spinnerMode: ProgressSpinnerMode = 'determinate';
  spinnerValue = 100;
  loading = false;

  private querySubscription?: Subscription;

  constructor(
    public dialog: MatDialog,
    private soundService: SoundService,
    private shuffleService: ShuffleService,
    private httpService: MiniGamesHttpService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.querySubscription = this.route.queryParams.subscribe((queryParam: any) => {
      this.page = queryParam['page'];
      this.group = queryParam['group'];
      this.filter = queryParam['filter'];
    });
  }

  async onGetWords() {
    this.userId = this.userService.getUserId();
    this.getWords?.unsubscribe();
    this.getWords = this.httpService
      .getWords({
        userId: this.userId || undefined,
        page: this.page,
        group: this.difficultyLevel.toString(),
        filter: this.filter,
      })
      .subscribe((words) => {
        console.log(words);
        if (words[0].paginatedResults) {
          words = words[0].paginatedResults;
        }
        this.sourceArray.push(...words);
      });

    // Если слов < 20 страниц больше 1, то добавляем слова с предыдущей страницы
    if (this.page) {
      if (this.sourceArray.length < 20 && parseInt(this.page) > 0) {
        this.getWords = this.httpService
          .getWords({
            userId: this.userId || undefined,
            page: (parseInt(this.page) - 1).toString(),
            group: this.group || this.difficultyLevel.toString(),
            filter: this.filter,
          })
          .subscribe((words) => {
            if (words[0].paginatedResults) {
              words = words[0].paginatedResults;
            }
            this.sourceArray.push(...words);
          });
      }
    }
  }

  /* onGetWords() {
    let words: IWord[] = [
      {audio: '',
      audioExample: '',
      audioMeaning: '',
      id: '',
      image: '',
      textExample: '',
      textExampleTranslate: '',
      textMeaning: '',
      textMeaningTranslate: '',
      transcription: '',
      word: 'Acknowledgement',
      wordTranslate: 'Подтверждение',},

      {audio: '',
      audioExample: '',
      audioMeaning: '',
      id: '',
      image: '',
      textExample: '',
      textExampleTranslate: '',
      textMeaning: '',
      textMeaningTranslate: '',
      transcription: '',
      word: 'Procrastination',
      wordTranslate: 'Прокрастинация',},

      {audio: '',
      audioExample: '',
      audioMeaning: '',
      id: '',
      image: '',
      textExample: '',
      textExampleTranslate: '',
      textMeaning: '',
      textMeaningTranslate: '',
      transcription: '',
      word: 'Methamphetamine',
      wordTranslate: 'Метамфетамин',},

      {audio: '',
      audioExample: '',
      audioMeaning: '',
      id: '',
      image: '',
      textExample: '',
      textExampleTranslate: '',
      textMeaning: '',
      textMeaningTranslate: '',
      transcription: '',
      word: 'Accomplishments',
      wordTranslate: 'Достижения',},

      {audio: '',
      audioExample: '',
      audioMeaning: '',
      id: '',
      image: '',
      textExample: '',
      textExampleTranslate: '',
      textMeaning: '',
      textMeaningTranslate: '',
      transcription: '',
      word: 'Misapprehension',
      wordTranslate: 'Недоразумение',}
    ];

    this.sourceArray.push(...words);
  } */

  nextRoundReset(): void {
    this.countDown?.unsubscribe();
    this.isGamePaused = false;
    this.isRoundOver = false;
    this.countdownTimer = this.roundLength; // reset timer
    this.spinnerValue = 100;

    this.currentWord = this.sourceArray[this.currentWordIndex].word.toUpperCase();
    this.currentWordTranslation = this.sourceArray[this.currentWordIndex].wordTranslate.toUpperCase();

    this.scrambledWordAsArray = this.shuffleService.shuffleLettersInWord(this.currentWord);
    this.scrambledWord = this.scrambledWordAsArray.join('');
    this.movesCountdownCounter = this.currentWord.length; // reset moves counter

    this.countDown = timer(0, this.tick) // start timer countdown
      .subscribe(() => {
        if (this.countdownTimer > 0) {
          if (!this.isGamePaused) {
            this.countdownTimer -= 1;
            this.spinnerValue = (100 / this.roundLength) * this.countdownTimer;
          }
        }
        if (this.countdownTimer === 0) {
          this.isRoundOver = true;
          this.soundService.playAudio('round lost');
          this.errorsCounter += 1;
          this.toTrainedWords(Answer.WRONG);
          this.imageSrc = this.srcCommPart + this.errorsCounter + '.png';

          if (this.errorsCounter === 5 || this.isLastRound()) {
            this.isGameOver = true;
            setTimeout(() => {
              this.finalize();
            }, this.gameOverSoundDelay);
          }

          this.countDown?.unsubscribe();
        }
      });
  }

  toTrainedWords(res: Answer) {
    this.trainedWords.push({
      id: this.sourceArray[this.currentWordIndex]._id || this.sourceArray[this.currentWordIndex].id,
      word: this.sourceArray[this.currentWordIndex].word,
      translation: this.sourceArray[this.currentWordIndex].wordTranslate,
      timeStamp: Date.now(),
      result: res,
      audio: this.sourceArray[this.currentWordIndex].audio,
    });
  }

  isLastRound() {
    if (this.currentWordIndex === this.numberOfGameRounds - 1) {
      return true;
    }
    return false;
  }

  startNextRound() {
    // Начинаем следующий раунд

    this.currentWordIndex += 1;
    if (this.currentRound < this.numberOfGameRounds) {
      this.currentRound += 1;
    }
    if (this.roundsLeft > 0) {
      this.roundsLeft -= 1;
    }

    if (this.currentWordIndex === this.numberOfGameRounds) {
      this.isGameOver = true;
      setTimeout(() => {
        this.finalize();
      }, this.gameOverSoundDelay);
    }

    if (!this.isGameOver) {
      this.nextRoundReset();
    }
  }

  dropLetter(event: CdkDragDrop<string[]>) {
    // dropLetter(event: CdkDragEnter) {
    if (this.scrambledWordAsArray) {
      this.previousScrambledWord = this.scrambledWordAsArray.join('');
      if (this.movesCountdownCounter > 0) {
        moveItemInArray(this.scrambledWordAsArray, event.previousIndex, event.currentIndex);
        // moveItemInArray(this.scrambledWordAsArray, event.item.data, event.container.data);
      }
      if (this.previousScrambledWord !== this.scrambledWordAsArray.join('')) {
        // если буква сдвинулась, то ход засчитываем
        if (this.movesCountdownCounter > 0) this.movesCountdownCounter -= 1;
        this.soundService.playAudio('move');
        this.previousScrambledWord = this.scrambledWordAsArray.join('');
      }

      if (this.movesCountdownCounter === 0) {
        this.isGamePaused = true;
        this.soundService.playAudio('round lost');
        this.errorsCounter += 1;
        this.imageSrc = this.srcCommPart + this.errorsCounter + '.png';
        this.isRoundOver = true;
        this.toTrainedWords(Answer.WRONG);
        if (this.errorsCounter === 5 || this.isLastRound()) {
          this.isGameOver = true;
          setTimeout(() => {
            this.finalize();
          }, this.gameOverSoundDelay);
        }
      }
      if (this.currentWord === this.scrambledWordAsArray?.join('')) {
        this.isGamePaused = true;
        this.soundService.playAudio('round won');
        this.isRoundOver = true;
        this.toTrainedWords(Answer.CORRECT);
        if (this.isLastRound()) {
          this.isGameOver = true;
          setTimeout(() => {
            this.finalize();
          }, this.gameOverSoundDelay);
        }
      }
    }
  }

  isGameLost(): boolean {
    if (this.errorsCounter === 5) {
      return true;
    }
    return false;
  }

  finalize() {
    if (this.isGameLost()) {
      this.soundService.playAudio('game lost');
    } else {
      this.soundService.playAudio('game won');
    }
    setTimeout(() => {
      this.isResultsShown = true;
    }, this.gameOverSoundDelay);
  }

  onCloseDialog(): void {
    this.isGamePaused = true;
    const dialogRef = this.dialog.open(CloseGameDialogComponent, {});

    dialogRef.afterClosed().subscribe(() => {
      this.isGamePaused = false;
    });
  }

  onToggleSound(): void {
    this.soundService.toggleSound();
    this.isSoundOn = this.soundService.isSoundOn;
  }

  onSetDifficultyLevel(value: number) {
    this.difficultyLevel = value;
  }

  onSetNumberOfRounds(value: number) {
    this.numberOfGameRounds = value;
  }

  onSetRoundLength(value: number) {
    this.roundLength = value;
  }

  onStartGame() {
    this.loading = true;
    this.roundsLeft = this.numberOfGameRounds - 1;
    this.sourceArray = [];
    this.resetGame();
    this.isGameStarted = true;
    const startGame = () => {
      if (this.sourceArray.length) {
        this.loading = false;
        this.nextRoundReset();
      } else {
        setTimeout(startGame, 100);
      }
    };
    startGame();
  }

  async resetGame() {
    this.isResultsShown = false;
    this.movesCountdownCounter = 0;
    this.currentWordIndex = 0;
    this.currentRound = this.currentWordIndex + 1;
    this.countdownTimer = 0;
    this.spinnerValue = 100;
    this.isGamePaused = false;
    this.isSoundOn = false;
    this.isRoundOver = false;
    this.isGameOver = false;
    this.errorsCounter = 0;
    this.imageSrc = this.srcCommPart + this.errorsCounter + '.png';
    this.trainedWords = [];
    this.onGetWords();
  }

  addLeadingZero(number: number): string {
    let res = number < 10 ? '0' + number : number.toString();
    return res;
  }

  ngOnDestroy() {
    this.countDown?.unsubscribe();
    this.getWords?.unsubscribe();
    this.querySubscription?.unsubscribe();
  }
}
