import { createAction, props } from '@ngrx/store';
import {
  AggregatedWordsRequestParams,
  UpdateUserWordsRequest,
  UserWordModel,
  WordsRequestParams,
} from 'src/app/core/models/word.model';

import { IWord, TextbookUrlParams } from '../models/textbook.model';
import { ITrainedWord } from 'src/app/core/models/ITrainedWord';

export const loadWords = createAction('[Textbook]  Load_Words', props<{ payload: AggregatedWordsRequestParams }>());

export const loadHardWords = createAction(
  '[Textbook]  Load_Hard_Words',
  props<{ payload: AggregatedWordsRequestParams }>(),
);

export const loadWordsSuccess = createAction(
  '[Textbook]  Load_Words_Success',
  props<{
    payload: { words: IWord[]; totalWordsInGroup: number; userWordsInGroup: number; userWordsOnPage: number };
  }>(),
);

export const getWordSettingsTranslation = createAction('[Textbook]  get_word_Settings_Translation');
export const getWordSettingsAddButtons = createAction('[Textbook]  get_word_Settings_AddButtons');
export const setWordSettingsTranslation = createAction(
  '[Textbook]  set_word_Settings_Translation',
  props<{ payload: boolean }>(),
);
export const setWordSettingsAddButtons = createAction(
  '[Textbook]  set_word_Settings_AddButtons',
  props<{ payload: boolean }>(),
);

export const updateUserWord = createAction(
  '[Textbook]  update_User_Word',
  props<{ payload: { word: IWord; page: string; group: string; difficulty: string; filter?: string } }>(),
);

export const updateUserWordSuccess = createAction(
  '[Textbook]  update_User_Word_Success',
  props<{ payload: AggregatedWordsRequestParams }>(),
);

export const updateUserWords = createAction('[Textbook]  update_User_Words', props<{ payload: ITrainedWord[] }>());

export const wordsUpdatedSuccess = createAction(
  '[Textbook]  update_User_Words_Success',
  props<{ payload: UserWordModel[] }>(),
);
