import { IWord } from 'src/app/core/models/IWord';
import { ITrainedWord } from 'src/app/core/models/ITrainedWord';

export interface AudiochallengeState {
  list: IWord[];
  trainedWords: ITrainedWord[];
  translations: string[];
  isGameStarted: boolean;
  currentWord: IAudiochallengeWord;
  isTranslationChoosed: boolean;
  maxRightAnswers: number;
  previousMaxAnswers: number;
  isGameEnded: boolean;
  isSoundOn: boolean;
  audioSrc: string;
}

export interface IAudiochallengeWord extends IWord {
  translationsArray: string[];
}
