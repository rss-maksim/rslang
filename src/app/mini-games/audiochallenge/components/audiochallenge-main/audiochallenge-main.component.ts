import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SprintGamePauseExitComponent } from 'src/app/mini-games/sprint/components/sprint-game-pause-exit/sprint-game-pause-exit.component';
import { audiochallengeStarted, closeGame } from 'src/app/redux/actions/audiochallenge.actions';
import { IStatsWord } from 'src/app/redux/models/audiochallenge.state.model';
import { AppState } from 'src/app/redux/models/state.model';
import {
  selectIsGameEnded,
  selectIsGameStarted,
  selectStatsList,
} from 'src/app/redux/selectors/audiochallenge.selectors';

@Component({
  selector: 'app-audiochallenge-main',
  templateUrl: './audiochallenge-main.component.html',
  styleUrls: ['./audiochallenge-main.component.scss'],
})
export class AudiochallengeMainComponent implements OnInit {
  isGameStarted$!: Observable<boolean>;
  isStarted!: boolean;
  isGameEnded!: Observable<boolean>;
  difficulty!: number;
  statsList$!: Observable<IStatsWord[]>;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.clearGame();
    this.isGameStarted$ = this.store.select(selectIsGameStarted);
    this.isGameEnded = this.store.select(selectIsGameEnded);
    this.statsList$ = this.store.select(selectStatsList);
  }

  startGame() {
    this.store.dispatch(audiochallengeStarted());
  }

  setDifficulty(value: number | null) {
    if (value !== null) {
      this.difficulty = value;
    }
  }
  openDialog() {
    this.dialog.open(SprintGamePauseExitComponent);
  }
  clearGame() {
    this.store.dispatch(closeGame());
  }
}
