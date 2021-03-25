import { createAction, props } from '@ngrx/store';

export const loadWords = createAction('[AudiochallengeGameComponent] Load Words');

export const wordsLoadedSuccess = createAction(
  '[AudiochallengeGameComponent] Words Loaded Success',
  props<{ payload: any }>(),
);

export const audiochallengeStarted = createAction('[AudiochallengeGameComponent] Audiochallenge Started');

export const audiochallengeEnded = createAction('[AudiochallengeGameComponent] Audiochallenge Ended');

export const getCurrentWord = createAction('[AudiochallengeGameComponent] Get Word', (payload: string) => ({
  payload,
}));

export const wordByIdLoadedSuccess = createAction(
  '[AudiochallengeGameComponent] Word By Id Loaded Success',
  (payload: IWord) => ({
    payload,
  }),
);

export const playWordSound = createAction('[AudiochallengeGameComponent] Play Word Sound');
export const nextWord = createAction('[AudiochallengeGameComponent] Next Word', (payload: string) => ({
  payload,
}));

export const translationChoosed = createAction('[AudiochallengeGameComponent] Translation Choosed');

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
