import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { soundOf, soundOn } from 'src/app/redux/actions/audiochallenge.actions';
import { AppState } from 'src/app/redux/models/state.model';
import { selectIsSoundOnBool } from 'src/app/redux/selectors/audiochallenge.selectors';

@Component({
  selector: 'app-game-sounds-button',
  templateUrl: './game-sounds-button.component.html',
  styleUrls: ['./game-sounds-button.component.scss'],
})
export class GameSoundsButtonComponent implements OnInit {
  isSoundOn$!: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.isSoundOn$ = this.store.select(selectIsSoundOnBool);
  }

  soundON() {
    this.store.dispatch(soundOn());
  }

  soundOFF() {
    this.store.dispatch(soundOf());
  }
}
