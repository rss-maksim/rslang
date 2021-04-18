import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CloseGameDialogComponent } from 'src/app/mini-games/shared/components/close-game-dialog/close-game-dialog.component';
import { audiochallengeEnded, audiochallengeStarted, closeGame } from 'src/app/redux/actions/audiochallenge.actions';
import { AppState } from 'src/app/redux/models/state.model';
import { ITrainedWord } from 'src/app/core/models/ITrainedWord';

import {
  selectIsGameEnded,
  selectIsGameStarted,
  selectIsLoading,
  selectTrainedWords,
} from 'src/app/redux/selectors/audiochallenge.selectors';
import { Games } from 'src/app/core/constants/mini-games';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { DEFAULT_DIFFICULTY_LEVEL } from 'src/app/core/constants/common';
import { delay, take } from 'rxjs/operators';

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
  isLoading$!: Subscription;
  loading!: boolean;
  DEFAULT_DIFFICULTY_LEVEL = DEFAULT_DIFFICULTY_LEVEL;

  private querySubscription!: Subscription;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
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
    this.isLoading$ = this.store
      .select(selectIsLoading)
      .pipe(delay(0))
      .subscribe((value) => {
        this.loading = value;
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
    this.isGameStarted$.pipe(take(1)).subscribe((started) => {
      if (started) {
        this.dialog.open(CloseGameDialogComponent);
      } else {
        this.router.navigate(['mini-games']);
      }
    });
  }
  clearGame() {
    this.store.dispatch(closeGame());
  }
  ngOnDestroy() {
    this.querySubscription.unsubscribe();
    this.isLoading$.unsubscribe();
    this.store.dispatch(audiochallengeEnded());
  }
}
