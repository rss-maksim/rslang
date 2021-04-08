import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/redux/models/state.model';
import { selectWordSettingsAddButtons, selectWordSettingsTranslation } from 'src/app/redux/selectors/textbook.selector';
import { IWord } from 'src/app/redux/models/textbook.model';
import { playRawSoundArr } from '../../../mini-games/sprint/utils/utils';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss'],
})
export class WordCardComponent {
  @Input() item: any;
  @Input() correctWordsCount = 0;
  @Input() wrongWordsCount = 0;
  @Input() isAuthorized: boolean | null = false;
  @Output() updateUserWord = new EventEmitter();
  isTranslation$ = this.store.select(selectWordSettingsTranslation);
  isSettingButtons$ = this.store.select(selectWordSettingsAddButtons);

  constructor(private store: Store<AppState>, public api: ApiService) {}

  wordSound(arr: any) {
    const audioArr: string[] = arr.map((str: string) => `${this.api.githubAssetUrl}/${str}`);
    playRawSoundArr(audioArr);
  }

  updateWord(word: IWord, difficulty: string) {
    this.updateUserWord.emit({ word, difficulty });
  }
}
