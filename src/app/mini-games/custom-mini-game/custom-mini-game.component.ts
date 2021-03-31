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
    ['humor', 'юмор'],
    ['height', 'высота'],
    ['school', 'школа'],
    ['season', 'время года'],
    ['calendar', 'календарь'],
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
  roundLength = 8; // длина раунда в тиках
  timeoutBetweenRounds = 2_000;
  countDown?: Subscription;
  roundsLeft = this.sourceArray.length - 1;
  isGamePaused = false;
  isSoundOn = false;
  isGameLost = false;
  errorsCounter = 0;
  imageSrc = '../../../assets/images/mini-games/custom-mini-game/hangman_stage' + this.errorsCounter + '.png';

  constructor(public dialog: MatDialog, private soundService: SoundService, private shuffleService: ShuffleService) {}

  ngOnInit() {
    this.startGame();
  }

  startGame(): void {
    this.nextRoundReset();
  }

  compareWords(wordOne: string, wordTwo: string): boolean {
    return wordOne === wordTwo;
  }

  nextRoundReset(): void {
    console.log('Entering nextRoundReset()');
    console.log('movesCountdownCounter', this.movesCountdownCounter);
    console.log('currentWordIndex', this.currentWordIndex);
    console.log('roundsLeft', this.roundsLeft);
    console.log();
    console.log('___________');
    console.log();

    // debugger;

    this.isGamePaused = false;
    this.countDown?.unsubscribe();
    this.countdownTimer = this.roundLength; // reset timer

    if (!this.isGameOver()) {
      this.currentWord = this.sourceArray[this.currentWordIndex][0];
      this.currentWordTranslation = this.sourceArray[this.currentWordIndex][1];
      this.scrambledWordAsArray = this.shuffleService.shuffleLettersInWord(this.currentWord);
      this.scrambledWord = this.scrambledWordAsArray.join('');
      this.movesCountdownCounter = this.currentWord.length; // reset moves counter

      this.countDown = timer(0, this.tick) // start timer countdown
        .subscribe(() => {
          if (this.countdownTimer > 0 && !this.isGameOver()) {
            if (!this.isGamePaused) {
              this.countdownTimer -= 1;
            }
          }
          if (this.countdownTimer === 0 || this.isGameOver()) {
            this.countDown?.unsubscribe();
            if (!this.isGameOver()) {
              this.errorsCounter += 1;

              console.log('errorsCounter', this.errorsCounter);

              this.imageSrc =
                '../../../assets/images/mini-games/custom-mini-game/hangman_stage' + this.errorsCounter + '.png';
              this.soundService.playAudio('round lost');

              // debugger;
              console.log('Before changing currentWordIndex and roundsLeft');
              console.log('movesCountdownCounter', this.movesCountdownCounter);
              console.log('currentWordIndex', this.currentWordIndex);
              console.log('roundsLeft', this.roundsLeft);
              console.log('this.isGameOver(): ', this.isGameOver());
              console.log();
              console.log('___________');
              console.log();

              //this.currentWordIndex += 1;
              //this.roundsLeft -= 1;

              console.log('After changing currentWordIndex and roundsLeft');
              console.log('movesCountdownCounter', this.movesCountdownCounter);
              console.log('currentWordIndex', this.currentWordIndex);
              console.log('roundsLeft', this.roundsLeft);
              console.log('this.isGameOver(): ', this.isGameOver());
              console.log();
              console.log('___________');
              console.log();

              setTimeout(() => {
                // задерживаем начало следующего раунда
                console.log('-----');
                console.log('this.isGameOver(): ', this.isGameOver());
                console.log('-----');
                if (!this.isGameOver()) {
                  this.nextRoundReset();
                }
              }, this.timeoutBetweenRounds);
            }
          }
          if (this.isGameOver()) {
            if (this.errorsCounter < 5) {
              this.soundService.playAudio('round won');
            } else {
              this.soundService.playAudio('round lost');
            }
          }
        });
    }

    this.currentWordIndex += 1;
    this.roundsLeft -= 1;

    /*     if (this.isGameOver()) {
      if (this.errorsCounter < 5) {
        this.soundService.playAudio('round won');
      } else {
        this.soundService.playAudio('round lost');
      }
    } */
  }

  isRoundLost(): boolean {
    if (this.countdownTimer === 0 || this.movesCountdownCounter === 0) return true;
    return false;
  }

  isRoundWon(): boolean {
    if (this.currentWord === this.scrambledWordAsArray?.join('')) return true;
    return false;
  }

  isGameOver(): boolean {
    if (this.currentWordIndex >= this.sourceArray.length || this.errorsCounter >= 5) return true;
    return false;
  }

  dropLetter(event: CdkDragDrop<string[]>) {
    if (this.scrambledWordAsArray) {
      this.previousScrambledWord = this.scrambledWordAsArray.join('');
      if (this.movesCountdownCounter > 0 && !this.isGameOver()) {
        moveItemInArray(this.scrambledWordAsArray, event.previousIndex, event.currentIndex);
      }
      if (this.previousScrambledWord !== this.scrambledWordAsArray.join('')) {
        // если буква сдвинулась, то ход засчитываем
        if (this.movesCountdownCounter > 0 && !this.isGameOver()) this.movesCountdownCounter -= 1;
        this.soundService.playAudio('move');
        this.previousScrambledWord = this.scrambledWordAsArray.join('');
      }
      if (this.isRoundLost() && !this.isGameOver()) {
        this.isGamePaused = true;
        this.soundService.playAudio('round lost');
        this.errorsCounter += 1;
        this.imageSrc =
          '../../../assets/images/mini-games/custom-mini-game/hangman_stage' + this.errorsCounter + '.png';
        setTimeout(() => {
          // задерживаем начало следующего раунда
          this.nextRoundReset();
        }, this.timeoutBetweenRounds);
      }
      if (this.isRoundWon() && !this.isGameOver()) {
        this.isGamePaused = true;
        this.soundService.playAudio('round won');
        setTimeout(() => {
          // задерживаем начало следующего раунда
          this.nextRoundReset();
        }, this.timeoutBetweenRounds);
      }

      /*       if (this.isGameOver()) {
        if (this.errorsCounter < 5) {
          this.soundService.playAudio('round won');
        } else {
          this.soundService.playAudio('round lost');
        }
      } */
    }
  }

  onCloseDialog(): void {
    this.isGamePaused = true;
    const dialogRef = this.dialog.open(CloseDialogComponent, {
      width: '350px',
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
