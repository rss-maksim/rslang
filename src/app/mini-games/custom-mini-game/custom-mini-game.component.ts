import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-custom-mini-game',
  templateUrl: './custom-mini-game.component.html',
  styleUrls: ['./custom-mini-game.component.scss'],
})
export class CustomMiniGameComponent implements OnInit, OnDestroy {
  sourceArray = [
    ['humor', 'юмор'],
    ['height', 'высота'],
    /*['school', 'школа'],
    ['season', 'время года'],
    ['calendar', 'календарь'],*/
  ];
  currentWord?: string;
  currentWordTranslation?: string;
  scrambledWordAsArray?: string[];
  previousScrambledWord?: string;
  scrambledWord?: string;
  movesCountdownCounter = 0;
  wordIndex = -1;
  countdownTimer = 0;
  tick = 1_000;
  countDown?: Subscription;
  roundsLeft = this.sourceArray.length + 1;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.startGame();
  }

  startGame() {
    this.nextRoundReset();
  }

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  compareWords(wordOne: string, wordTwo: string): boolean {
    return wordOne === wordTwo;
  }

  nextRoundReset() {
    this.countDown?.unsubscribe();
    this.countdownTimer = 15; // reset timer
    if (!this.isGameOver()) {
      this.wordIndex += 1;
      this.roundsLeft -= 1;
    }
    this.currentWord = this.sourceArray[this.wordIndex][0];
    this.currentWordTranslation = this.sourceArray[this.wordIndex][1];
    this.scrambledWordAsArray = this.shuffleLettersInWord(this.currentWord);
    this.scrambledWord = this.scrambledWordAsArray.join('');
    this.movesCountdownCounter = this.currentWord.length; // reset moves counter

    this.countDown = timer(0, this.tick) // start timer countdown
      .subscribe(() => {
        if (this.countdownTimer > 0 && !this.isGameOver()) {
          this.countdownTimer -= 1;
        } else {
          this.countDown?.unsubscribe();
          if (!this.isGameOver()) {
            this.nextRoundReset();
          }
        }
      });
  }

  shuffleLettersInWord(word: string): string[] {
    // Fisher–Yates shuffle Algorithm
    let wordAsArray = word.split('');
    for (let i = wordAsArray.length - 1; i > 0; i -= 1) {
      let j = this.getRandomInt(i + 1);
      let temp = wordAsArray[i];
      wordAsArray[i] = wordAsArray[j];
      wordAsArray[j] = temp;
    }
    return wordAsArray;
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
    if (this.wordIndex === this.sourceArray.length) return true;
    return false;
  }

  dropLetter(event: CdkDragDrop<string[]>) {
    if (this.scrambledWordAsArray) {
      this.previousScrambledWord = this.scrambledWordAsArray.join('');
      moveItemInArray(this.scrambledWordAsArray, event.previousIndex, event.currentIndex);
      if (this.previousScrambledWord !== this.scrambledWordAsArray.join('')) {
        if (this.movesCountdownCounter > 0 && !this.isGameOver()) this.movesCountdownCounter -= 1;
        this.previousScrambledWord = this.scrambledWordAsArray.join('');
      }
      if (this.currentWord === this.scrambledWordAsArray.join('') && !this.isGameOver()) {
        this.nextRoundReset();
      }
    }
  }

  onCloseGame() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.countDown?.unsubscribe();
  }
}