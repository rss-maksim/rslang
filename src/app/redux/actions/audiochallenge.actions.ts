import { createAction, props } from '@ngrx/store';

export const loadWords = createAction('[AudiochallengeGameComponent] Load Words');

export const wordsLoadedSuccess = createAction(
  '[AudiochallengeGameComponent] Words Loaded Success',
  props<{ payload: any }>(),
);

export const audiochallengeStarted = createAction('[AudiochallengeGameComponent] Audiochallenge Started');

export const audiochallengeEnded = createAction('[AudiochallengeGameComponent] Audiochallenge Ended');

export const translationsLoadedSuccess = createAction(
  '[AudiochallengeGameComponent] Translation Loaded Success',
  props<{ payload: string[] }>(),
);

export const checkAnswer = createAction('[AudiochallengeGameComponent] Check Answer', props<{ payload: string }>());

export const rightAnswer = createAction('[AudiochallengeGameComponent] Right Answer');
export const wrongAnswer = createAction('[AudiochallengeGameComponent] Wrong Answer');

export const playWordSound = createAction('[AudiochallengeGameComponent] Play Word Sound');
export const showNextWord = createAction('[AudiochallengeGameComponent] Show Next Word');

export const translationChoosed = createAction('[AudiochallengeGameComponent] Translation Choosed');

export const checkGameOver = createAction('[AudiochallengeGameComponent] Check Game Over');

export const gameOver = createAction('[AudiochallengeGameComponent] Game Over');

export interface IWord {
  id: string;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  translationsArray?: string[];
}

export const initialWord: IWord = {
  id: '',
  word: '',
  image: '',
  audio: '',
  audioMeaning: '',
  audioExample: '',
  textMeaning: '',
  textExample: '',
  transcription: '',
  wordTranslate: '',
  textMeaningTranslate: '',
  textExampleTranslate: '',
};
