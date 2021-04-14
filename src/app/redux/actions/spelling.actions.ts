import { createAction, props } from '@ngrx/store';

import { AggregatedWordsRequestParams } from 'src/app/core/models/word.model';
import { IWord } from '../../core/models/IWord';

export const spellingStarted = createAction('[SpellingGameComponent] Spelling Started');

export const loadWords = createAction(
  '[SpellingGameComponent] Load Words',
  props<{ payload: AggregatedWordsRequestParams }>(),
);

export const wordsLoadedSuccess = createAction(
  '[SpellingGameComponent] Words Loaded Success',
  props<{ payload: IWord[] }>(),
);

export const translationsLoadedSuccess = createAction(
  '[SpellingGameComponent] Translation Loaded Success',
  props<{ payload: string[] }>(),
);

export const shuffleTranslations = createAction('[SpellingGameComponent] Shuffle Translations');

export const translationsShuffled = createAction(
  '[SpellingGameComponent] TranslationsShuffled',
  props<{ payload: string[] }>(),
);

export const checkAnswer = createAction('[SpellingGameComponent] Check Answer', props<{ payload: string }>());

export const rightAnswer = createAction('[SpellingGameComponent] Right Answer');

export const wrongAnswer = createAction('[SpellingGameComponent] Wrong Answer');

export const playWordSound = createAction('[SpellingGameComponent] Play Word Sound');

export const showNextWord = createAction('[SpellingGameComponent] Show Next Word');

export const translationChoosed = createAction('[SpellingGameComponent] Translation Choosed');

export const checkGameOver = createAction('[SpellingGameComponent] Check Game Over');

export const soundOn = createAction('[SpellingGameComponent] Sound On');

export const soundOf = createAction('[SpellingGameComponent] Sound Of');

export const spellingEnded = createAction('[SpellingGameComponent] Spelling Ended');

export const gameOver = createAction('[SpellingGameComponent] Game Over');

export const closeGame = createAction('[SpellingGameComponent] Close Game');
