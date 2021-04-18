import { createAction, props } from '@ngrx/store';
import { AggregatedWordsRequestParams } from 'src/app/core/models/word.model';
import { IWord } from '../../core/models/IWord';

export const audiochallengeStarted = createAction('[AudiochallengeGameComponent] Audiochallenge Started');

export const loadWords = createAction(
  '[AudiochallengeGameComponent] Load Words',
  props<{ payload: AggregatedWordsRequestParams }>(),
);

export const wordsLoadedSuccess = createAction(
  '[AudiochallengeGameComponent] Words Loaded Success',
  props<{ payload: IWord[] }>(),
);

export const translationsLoadedSuccess = createAction(
  '[AudiochallengeGameComponent] Translation Loaded Success',
  props<{ payload: string[] }>(),
);

export const shuffleTranslations = createAction('[AudiochallengeGameComponent] Shuffle Translations');

export const translationsShuffled = createAction(
  '[AudiochallengeGameComponent] TranslationsShuffled',
  props<{ payload: string[] }>(),
);

export const checkAnswer = createAction('[AudiochallengeGameComponent] Check Answer', props<{ payload: string }>());

export const rightAnswer = createAction('[AudiochallengeGameComponent] Right Answer');

export const wrongAnswer = createAction('[AudiochallengeGameComponent] Wrong Answer');

export const playWordSound = createAction('[AudiochallengeGameComponent] Play Word Sound');

export const showNextWord = createAction('[AudiochallengeGameComponent] Show Next Word');

export const translationChoosed = createAction('[AudiochallengeGameComponent] Translation Choosed');

export const checkGameOver = createAction('[AudiochallengeGameComponent] Check Game Over');

export const soundOn = createAction('[AudiochallengeGameComponent] Sound On');

export const soundOf = createAction('[AudiochallengeGameComponent] Sound Of');

export const audiochallengeEnded = createAction('[AudiochallengeGameComponent] Audiochallenge Ended');

export const gameOver = createAction('[AudiochallengeGameComponent] Game Over');

export const closeGame = createAction('[AudiochallengeGameComponent] Close Game');
