import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/models/state.model';
import { selectWordSettingsAddButtons, selectWordSettingsTranslation } from 'src/app/redux/selectors/textbook.selector';
import { MiniGamesHttpService } from 'src/app/services/mini-games-http.service';

import { playRawSound, playRawSoundArr } from '../../../mini-games/sprint/utils/utils';
import { ApiService } from '../../../core/services/api.service';
import { deleteUserWords } from 'src/app/redux/actions/textbooks.actions';
import { IWord } from 'src/app/redux/models/textbook.model';
import { markWordAsHard } from '../../../redux/actions/textbooks.actions';

@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss'],
})
export class WordCardComponent {
  @Input() item: any;
  @Output() deleteUserWord = new EventEmitter();
  @Output() hardUserWord = new EventEmitter();
  isTranslation$ = this.store.select(selectWordSettingsTranslation);
  isSettingButtons$ = this.store.select(selectWordSettingsAddButtons);

  constructor(private store: Store<AppState>, public api: ApiService) {}

  wordSound(arr: any) {
    let audioArr: string[] = arr.map((str: string) => `${this.api.githubAssetUrl}/${str}`);
    playRawSoundArr(audioArr);
  }

  deleteWord(word: IWord) {
    this.deleteUserWord.emit(word);
  }

  hardWord(word: IWord) {
    this.hardUserWord.emit(word);
  }
}
