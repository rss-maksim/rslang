import { createAction, props } from '@ngrx/store';
import { WordsRequestParams } from 'src/app/core/models/word.model';

import { IWord, TextbookUrlParams } from '../models/textbook.model';

export const loadWords = createAction('[Textbook]  Load_Words', props<{ payload: WordsRequestParams }>());

export const loadWordsSuccess = createAction('[Textbook]  Load_Words_Success', props<{ payload: IWord[] }>());

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

export const deleteUserWords = createAction('[Textbook]  delete_User_Words', props<{ payload: IWord }>());

export const deleteUserWordsSuccess = createAction(
  '[Textbook]  delete_User_Words_Success',
  props<{ payload: WordsRequestParams }>(),
);
