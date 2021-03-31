import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, timer } from 'rxjs';
import { CloseDialogComponent } from './close-dialog/close-dialog.component';
import { ShuffleService } from './services/shuffle.service';
import { SoundService } from './services/sound.service';

@Component({
  selector: 'app-custom-mini-game',
  templateUrl: './custom-mini-game.component.html',
  styleUrls: ['./custom-mini-game.component.scss'],
})
export class CustomMiniGameComponent implements OnInit, OnDestroy {
  sourceArray = [
    ['humor', 'юмор', 'не выучено'],
    ['height', 'высота', 'не выучено'],
    ['school', 'школа', 'не выучено'],
    ['season', 'время года', 'не выучено'],
    ['calendar', 'календарь', 'не выучено'],
  ];
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
  roundsLeft = this.sourceArray.length - 1;
  isGamePaused = false;
  isSoundOn = false;
  isRoundOver = false;
  isGameOver = false;
  errorsCounter = 0;
  srcCommPart = '../../../assets/images/mini-games/custom-mini-game/hangman_stage';
  imageSrc = this.srcCommPart + this.errorsCounter + '.png';
  gameOverSoundDelay = 2_000;
  isResultsShown = false;

  constructor(public dialog: MatDialog, private soundService: SoundService, private shuffleService: ShuffleService) {}

  ngOnInit() {
    this.nextRoundReset();
  }

  nextRoundReset(): void {
    this.countDown?.unsubscribe();
    this.isGamePaused = false;
    this.isRoundOver = false;
    this.countdownTimer = this.roundLength; // reset timer

    this.currentWord = this.sourceArray[this.currentWordIndex][0]; //TODO переделать на запрос из сервиса
    this.currentWordTranslation = this.sourceArray[this.currentWordIndex][1]; //TODO переделать на запрос из сервиса

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
          this.sourceArray[this.currentWordIndex][2] = 'неправильно';
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

  isLastRound() {
    if (this.currentWordIndex === this.sourceArray.length - 1) {
      return true;
    }
    return false;
  }

  startNextRound() {
    // Начинаем следующий раунд
    console.log('In startNextRound()');

    this.currentWordIndex += 1;
    if (this.currentRound < this.sourceArray.length) {
      this.currentRound += 1;
    }
    if (this.roundsLeft > 0) {
      this.roundsLeft -= 1;
    }

    if (this.currentWordIndex === this.sourceArray.length) {
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
        this.sourceArray[this.currentWordIndex][2] = 'неправильно';
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
        this.sourceArray[this.currentWordIndex][2] = 'правильно';
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
    console.log('In finalize');
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
  }
}
