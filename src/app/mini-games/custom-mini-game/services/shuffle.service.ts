import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShuffleService {
  wordAsArray = [];

  constructor() {}

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
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
}
