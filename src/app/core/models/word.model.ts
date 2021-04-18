export interface WordModel {
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

export interface UserWordModel {
  id?: string;
  difficulty?: string;
  optional?: object;
}

export interface WordsRequestParams {
  group?: string;
  page?: string;
  wordsPerExampleSentenceLTE?: string;
  wordsPerPage?: string;
}

export interface AggregatedWordsRequestParams extends WordsRequestParams {
  userId?: string;
  filter?: string;
}

export interface WordRequestParams {
  noAssets?: string;
}

export interface CountResponsePayload {
  count: number;
}

export interface UpdateUserWordsRequest {
  userId: string;
  words: UserWordModel[];
}
