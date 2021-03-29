import { IAudiochallengeWord } from 'src/app/redux/models/IAudiochallengeWord';
import { IWord } from 'src/app/core/models/IWord';

export interface AudiochallengeState {
  list: IWord[];
  statsList: IStatsWord[];
  translations: string[];
  isGameStarted: boolean;
  currentWord: IAudiochallengeWord;
  audio: HTMLAudioElement;
  isTranslationChoosed: boolean;
  maxRightAnswers: number;
  previousMaxAnswers: number;
  isGameEnded: boolean;
  isSoundOn: boolean;
}

export interface IStatsWord {
  word: IWord;
  result: boolean;
}
