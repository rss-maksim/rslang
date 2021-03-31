import { IWord } from 'src/app/core/models/IWord';

export interface IAudiochallengeWord extends IWord {
  translationsArray: string[];
}
