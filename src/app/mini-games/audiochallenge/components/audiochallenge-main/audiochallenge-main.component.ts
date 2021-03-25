import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { audiochallengeStarted } from 'src/app/redux/actions/audiochallenge.actions';
import { AppState } from 'src/app/redux/models/state.model';
import { selectIsGameStarted } from 'src/app/redux/selectors/audiochallenge.selectors';

@Component({
  selector: 'app-audiochallenge-main',
  templateUrl: './audiochallenge-main.component.html',
  styleUrls: ['./audiochallenge-main.component.scss'],
})
export class AudiochallengeMainComponent implements OnInit {
  isGameStarted$!: Observable<boolean>;
  isStarted!: boolean;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isGameStarted$ = this.store.select(selectIsGameStarted);
  }

  startGame() {
    this.store.dispatch(audiochallengeStarted());
  }
}
