import { IWord } from 'src/app/core/models/IWord';
import { ITrainedWord } from 'src/app/core/models/ITrainedWord';

export interface SpellingState {
  list: IWord[];
  trainedWords: ITrainedWord[];
  translations: string[];
  isGameStarted: boolean;
  currentWord: ISpellingWord;
  isTranslationChoosed: boolean;
  maxRightAnswers: number;
  previousMaxAnswers: number;
  isGameEnded: boolean;
  isSoundOn: boolean;
  audioSrc: string;
}

export interface ISpellingWord extends IWord {
  translationsArray: string[];
}
