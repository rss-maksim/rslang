import { Component, Input, ChangeDetectionStrategy, OnChanges, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { IWord } from 'src/app/redux/actions/audiochallenge.actions';
import { AppState } from 'src/app/redux/models/state.model';
import { assetsApiUrl } from 'src/app/redux/reducers/audiochallengeReducer';

@Component({
  selector: 'app-audiochallenge-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudiochallengeWordCardComponent implements OnChanges {
  @Input() word!: IWord;
  @Input() guessed!: boolean | null;
  @Output() playEvent = new EventEmitter();
  path!: string;

  constructor(private store: Store<AppState>) {}

  ngOnChanges() {
    this.path = `${assetsApiUrl}/${this.word.image}?raw=true`;
  }

  onPlay() {
    this.playEvent.emit();
  }
}
