import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, timer } from 'rxjs';
import { IWord } from 'src/app/core/models/IWord';
import { ITrainedWord } from 'src/app/core/models/ITrainedWord';
import { Answer } from 'src/app/core/models/ISprintGame';
import { MiniGamesHttpService } from 'src/app/services/mini-games-http.service';
import { CloseDialogComponent } from './close-dialog/close-dialog.component';
import { ShuffleService } from './services/shuffle.service';
import { SoundService } from './services/sound.service';
import { WordsService } from 'src/app/core/services/words.service';

@Component({
  selector: 'app-custom-mini-game',
  templateUrl: './custom-mini-game.component.html',
  styleUrls: ['./custom-mini-game.component.scss'],
})
export class CustomMiniGameComponent implements OnInit, OnDestroy {
  sourceArray: IWord[] = [];
  /*sourceArray = [
    ['humor', 'юмор', 'не выучено'],
    ['height', 'высота', 'не выучено'],
    ['school', 'школа', 'не выучено'],
    ['season', 'время года', 'не выучено'],
    ['calendar', 'календарь', 'не выучено'],
  ];*/
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
  roundLength = 2; // длина раунда в тиках
  countDown?: Subscription;
  currentRound = this.currentWordIndex + 1;
  numberOfGameRounds = 10; // настраиваемое количество раундов в игре
  roundsLeft = 0;
  isGamePaused = false;
  isSoundOn = false;
  isRoundOver = false;
  isGameOver = false;
  errorsCounter = 0;
  srcCommPart = '../../../assets/images/mini-games/custom-mini-game/hangman_stage';
  imageSrc = this.srcCommPart + this.errorsCounter + '.png';
  gameOverSoundDelay = 2_000;
  isResultsShown = false;
  getWords?: Subscription;

  constructor(
    public dialog: MatDialog,
    private soundService: SoundService,
    private shuffleService: ShuffleService,
    private httpService: WordsService,
  ) {}

  ngOnInit() {
    this.getWords = this.httpService.getAll().subscribe((words) => {
      this.sourceArray.push(...words);
      this.nextRoundReset();
      this.roundsLeft = this.numberOfGameRounds - 1;
    });
  }

  nextRoundReset(): void {
    this.countDown?.unsubscribe();
    this.isGamePaused = false;
    this.isRoundOver = false;
    this.countdownTimer = this.roundLength; // reset timer

    this.currentWord = this.sourceArray[this.currentWordIndex].word;
    this.currentWordTranslation = this.sourceArray[this.currentWordIndex].wordTranslate;

    this.scrambledWordAsArray = this.shuffleService.shuffleLettersInWord(this.currentWord);
    this.scrambledWord = this.scrambledWordAsArray.join('');
    this.movesCountdownCounter = this.currentWord.length; // reset moves counter

    this.countDown = timer(0, this.tick) // start timer countdown
      .subscribe(() => {
        if (this.countdownTimer > 0) {
          if (!this.isGamePaused) {
            this.countdownTimer -= 1;
          }
        }
        if (this.countdownTimer === 0) {
          this.isRoundOver = true;
          this.soundService.playAudio('round lost');
          this.errorsCounter += 1;
          this.toTrainedWords(Answer.WRONG);
          //this.sourceArray[this.currentWordIndex][2] = 'неправильно';
          this.imageSrc = this.srcCommPart + this.errorsCounter + '.png';

          if (this.errorsCounter === 5 || this.isLastRound()) {
            this.isGameOver = true;
            setTimeout(() => {
              this.finalize();
            }, this.gameOverSoundDelay);
            // TODO вывод статистики за игру (функция)
          }

          this.countDown?.unsubscribe();
        }
      });
  }

  toTrainedWords(res: Answer) {
    this.trainedWords.push({
      id: this.sourceArray[this.currentWordIndex].id,
      word: this.sourceArray[this.currentWordIndex].word,
      translation: this.sourceArray[this.currentWordIndex].wordTranslate,
      timeStamp: Date.now(),
      result: res,
      audio: this.sourceArray[this.currentWordIndex].audio,
    });
  }

  isLastRound() {
    if (this.currentWordIndex === this.sourceArray.length - 1) {
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
      // TODO вывод статистики за игру (функция)
    }

    if (!this.isGameOver) {
      this.nextRoundReset();
    }
  }

  dropLetter(event: CdkDragDrop<string[]>) {
    if (this.scrambledWordAsArray) {
      this.previousScrambledWord = this.scrambledWordAsArray.join('');
      if (this.movesCountdownCounter > 0) {
        moveItemInArray(this.scrambledWordAsArray, event.previousIndex, event.currentIndex);
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
        if (this.isLastRound()) {
          this.isGameOver = true;
          setTimeout(() => {
            this.finalize();
          }, 2_000);
          // TODO вывод статистики за игру (функция)
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
          // TODO вывод статистики за игру (функция)
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
      console.log('this.isGameLost()', this.isGameLost());
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
    const dialogRef = this.dialog.open(CloseDialogComponent, {
      width: '350px', // TODO установить ширину настройками
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isGamePaused = false;
    });
  }

  onToggleSound(): void {
    this.soundService.toggleSound();
    this.isSoundOn = this.soundService.isSoundOn;
  }

  ngOnDestroy() {
    this.countDown?.unsubscribe();
    this.getWords?.unsubscribe();
  }
}
