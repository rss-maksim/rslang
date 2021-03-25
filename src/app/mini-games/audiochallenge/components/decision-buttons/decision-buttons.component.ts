import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IWord, nextWord, translationChoosed } from 'src/app/redux/actions/audiochallenge.actions';
import { AppState } from 'src/app/redux/models/state.model';
import { selectIsChoosed, selectWords } from 'src/app/redux/selectors/audiochallenge.selectors';

@Component({
  selector: 'app-decision-buttons',
  templateUrl: './decision-buttons.component.html',
  styleUrls: ['./decision-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecisionButtonsComponent implements OnInit {
  @Input() id!: string;
  guessed$!: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.guessed$ = this.store.select(selectIsChoosed);
    console.log(this.id);
  }

  guess() {
    this.store.dispatch(translationChoosed());
  }

  nextWord() {
    this.store.dispatch(nextWord(this.id));
  }
}
