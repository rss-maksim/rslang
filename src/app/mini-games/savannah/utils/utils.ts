import { NUMBER_OF_PAGES } from './../../../core/constants/common';
import { IWord } from './../../../core/models/IWord';

export function getRandomFrom(number: number): number {
  return Math.floor(Math.random() * number);
}

export function getRandomNumbers(amount: number) {
  const pages: number[] = [];

  while (pages.length < amount) {
    const page = getRandomFrom(NUMBER_OF_PAGES);
    if (!pages.includes(page)) {
      pages.push(page);
    }
  }
  return pages;
}

export function getTranslations(words: IWord[]): string[] {
  return words.map((word: IWord) => word.wordTranslate);
}

export function shuffleArray(array: any[]): any[] {
  return array.sort(() => Math.random() - 0.5);
}

export function getRandomsFromArray(array: any[], amount: number, avoid?: string): string[] {
  var result = [];
  for (var i = 0; i < amount; i++) {
    var index = Math.floor(Math.random() * array.length);
    result.push(array[index]);
    array.splice(index, 1);
  }
  return result;
}
