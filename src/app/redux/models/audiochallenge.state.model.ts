import { IWord } from 'src/app/redux/actions/audiochallenge.actions';

export interface AudiochallengeState {
  list: IWord[];
  isGameStarted: boolean;
  currentWord: IWord;
  audio: HTMLAudioElement;
  image: HTMLImageElement;
  isTranslationChoosed: boolean;
}
