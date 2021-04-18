import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { CloseGameDialogComponent } from 'src/app/mini-games/shared/components/close-game-dialog/close-game-dialog.component';
import { spellingStarted, closeGame } from 'src/app/redux/actions/spelling.actions';
import { AppState } from 'src/app/redux/models/state.model';
import { ITrainedWord } from 'src/app/core/models/ITrainedWord';

import { selectIsGameEnded, selectIsGameStarted, selectTrainedWords } from 'src/app/redux/selectors/spelling.selectors';
import { Games } from 'src/app/core/constants/mini-games';
import { UserService } from 'src/app/core/services/user.service';
import { DEFAULT_DIFFICULTY_LEVEL } from 'src/app/core/constants/common';

@Component({
  selector: 'app-spelling-main',
  templateUrl: './spelling-main.component.html',
  styleUrls: ['./spelling-main.component.scss'],
})
export class SpellingMainComponent implements OnInit, OnDestroy {
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
  DEFAULT_DIFFICULTY_LEVEL = DEFAULT_DIFFICULTY_LEVEL;
  hasDifficultySlider = true;
  isLoading = false;

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
      if (this.page !== undefined) this.hasDifficultySlider = false;
    });
  }

  startGame() {
    this.store.dispatch(spellingStarted());
  }

  setDifficulty(value: number | undefined) {
    if (value !== undefined) {
      this.difficulty = value.toString();
    }
    this.startGame();
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
  }
}
