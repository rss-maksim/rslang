import { Component, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IWord, playWordSound } from 'src/app/redux/actions/audiochallenge.actions';
import { AppState } from 'src/app/redux/models/state.model';
import { selectIsChoosed } from 'src/app/redux/selectors/audiochallenge.selectors';

@Component({
  selector: 'app-audiochallenge-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudiochallengeWordCardComponent implements OnChanges {
  @Input() word!: IWord;

  @Input() img!: string;
  path!: string;

  guessed$!: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnChanges() {
    this.guessed$ = this.store.select(selectIsChoosed);
    if (this.img.length) {
      this.path = `data:image/jpeg;base64,${this.img}`;
    }
  }

  play() {
    this.store.dispatch(playWordSound());
  }
}
