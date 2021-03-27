import { IWord } from 'src/app/redux/actions/audiochallenge.actions';

export interface AudiochallengeState {
  list: IWord[];
  statsList: {
    word: IWord;
    result: boolean;
  }[];
  translations: string[];
  isGameStarted: boolean;
  currentWord: IWord;
  audio: HTMLAudioElement;
  isTranslationChoosed: boolean;
}
