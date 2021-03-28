import { createAction, props } from '@ngrx/store';

import { IWord, TextbookUrlParams } from '../models/textbook.model';

export const loadWords = createAction('[Textbook]  Load_Words', props<{ payload: TextbookUrlParams }>());

export const loadWordsSuccess = createAction('[Textbook]  Load_Words_Success', props<{ payload: IWord[] }>());
export const getGroupWords = createAction('[Textbook]  get_Group_Words');
export const getPageWords = createAction('[Textbook]  get_Page_Words');
export const setGroupWords = createAction('[Textbook]  set_Group_Words', props<{ payload: string }>());
export const setPageWords = createAction('[Textbook]  set_Page_Words', props<{ payload: string }>());
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
