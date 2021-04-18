import { Injectable } from '@angular/core';
import { IWord } from '../core/models/IWord';

@Injectable({
  providedIn: 'root',
})
export class MiniGamesHelperService {
  shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  getValuesArray(array: IWord[]): string[] {
    const tempArr = this.shuffleArray(array);
    return tempArr.map((elem: IWord) => elem.wordTranslate);
  }

  getRandomNumber(pages: number) {
    return Math.floor(Math.random() * pages);
  }
}
