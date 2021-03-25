import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCurrentWord, IWord } from 'src/app/redux/actions/audiochallenge.actions';
import { AppState } from 'src/app/redux/models/state.model';
import { selectCurrentWord } from 'src/app/redux/selectors/audiochallenge.selectors';

@Component({
  selector: 'app-audiochallenge-word',
  templateUrl: './audiochallenge-word.component.html',
  styleUrls: ['./audiochallenge-word.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudiochallengeWordComponent implements OnInit {
  @Input() word!: IWord;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    console.log('word');
  }
}
