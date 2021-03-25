import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IWord, nextWord, translationChoosed } from 'src/app/redux/actions/audiochallenge.actions';
import { AppState } from 'src/app/redux/models/state.model';
import { selectIsChoosed, selectWords } from 'src/app/redux/selectors/audiochallenge.selectors';

@Component({
  selector: 'app-decision-buttons',
  templateUrl: './decision-buttons.component.html',
  styleUrls: ['./decision-buttons.component.scss'],
})
export class DecisionButtonsComponent implements OnInit {
  words$!: Observable<IWord[]>;
  word$!: Observable<IWord[]>;
  id!: string;
  guessed$!: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.guessed$ = this.store.select(selectIsChoosed);
    this.words$ = this.store.select(selectWords);
    this.words$.subscribe((value) => {
      if (value.length > 0) {
        this.id = value[value.length - 1].id;
      }
    });
  }

  guess() {
    this.store.dispatch(translationChoosed());
  }

  nextWord() {
    this.store.dispatch(nextWord(this.id));
  }
}
