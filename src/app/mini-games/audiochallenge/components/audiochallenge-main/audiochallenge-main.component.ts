import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
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
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-audiochallenge-main',
  templateUrl: './audiochallenge-main.component.html',
  styleUrls: ['./audiochallenge-main.component.scss'],
})
export class AudiochallengeMainComponent implements OnInit, OnDestroy {
  isGameStarted$!: Observable<boolean>;
  isStarted!: boolean;
  isGameEnded!: Observable<boolean>;
  difficulty!: string;
  games = Games;
  page!: string;
  group!: string;
  filter!: string;
  trainedWords$!: Observable<ITrainedWord[]>;
  userId: string | null = this.userService.getUserId();

  private querySubscription!: Subscription;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.clearGame();
    this.isGameStarted$ = this.store.select(selectIsGameStarted);
    this.isGameEnded = this.store.select(selectIsGameEnded);
    this.trainedWords$ = this.store.select(selectTrainedWords);
    this.querySubscription = this.route.queryParams.subscribe((queryParam: any) => {
      this.page = queryParam['page'];
      this.group = queryParam['group'];
      this.filter = queryParam['filter'];
    });
  }

  startGame() {
    this.store.dispatch(audiochallengeStarted());
  }

  setDifficulty(value: number | null) {
    if (value !== null) {
      this.difficulty = value.toString();
    }
  }
  openDialog() {
    this.dialog.open(CloseGameDialogComponent);
  }
  clearGame() {
    this.store.dispatch(closeGame());
  }
  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
