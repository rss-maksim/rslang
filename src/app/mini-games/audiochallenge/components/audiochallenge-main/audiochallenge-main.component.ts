import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CloseGameDialogComponent } from 'src/app/mini-games/shared/components/close-game-dialog/close-game-dialog.component';
import { audiochallengeStarted, closeGame } from 'src/app/redux/actions/audiochallenge.actions';
import { AppState } from 'src/app/redux/models/state.model';
import { ITrainedWord } from 'src/app/core/models/ITrainedWord';

import {
  selectIsGameEnded,
  selectIsGameStarted,
  selectTrainedWords,
} from 'src/app/redux/selectors/audiochallenge.selectors';
import { Games } from 'src/app/core/constants/mini-games';

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
  games = Games;
  trainedWords$!: Observable<ITrainedWord[]>;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.clearGame();
    this.isGameStarted$ = this.store.select(selectIsGameStarted);
    this.isGameEnded = this.store.select(selectIsGameEnded);
    this.trainedWords$ = this.store.select(selectTrainedWords);
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
    this.dialog.open(CloseGameDialogComponent);
  }
  clearGame() {
    this.store.dispatch(closeGame());
  }
}
