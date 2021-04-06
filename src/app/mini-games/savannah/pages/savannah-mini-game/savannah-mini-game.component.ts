import { ISavannahGame } from 'src/app/core/models/ISavannahGame';
import { SavannahService } from './../../services/savannah.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameState } from './../../../../core/models/ISavannahGame';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Games } from 'src/app/core/constants/mini-games';
import { MatDialog } from '@angular/material/dialog';
import { CloseGameDialogComponent } from 'src/app/mini-games/shared/components/close-game-dialog/close-game-dialog.component';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-savannah-mini-game',
  templateUrl: './savannah-mini-game.component.html',
  styleUrls: ['./savannah-mini-game.component.scss'],
})
export class SavannahMiniGameComponent implements OnInit, OnDestroy {
  gameState = GameState;
  games = Games;
  game!: ISavannahGame;

  constructor(
    private savannahService: SavannahService,
    public closeDialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}
  closeDialogSubsription?: Subscription;
  routeSubscription$?: Subscription;

  ngOnInit() {
    this.savannahService.game$.subscribe((game: ISavannahGame) => {
      this.game = game;
    });
    this.savannahService.setUserID(this.userService.getUserId());
    this.routeSubscription$ = this.route.queryParams.subscribe((params: any) => {
      this.savannahService.setQueryParams(params);
      if (!!Object.keys(params).length) {
        this.savannahService.getWords(params['group'], params['page']);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription$?.unsubscribe();
    this.savannahService.gameReset();
  }

  startToPlay() {
    this.savannahService.setGameState(GameState.PLAY);
    this.savannahService.nextWord();
  }

  startGameWithDifficulty(group: number) {
    this.savannahService.getWords(group);
  }

  answered(isAnswerCorrect: boolean) {
    this.savannahService.setAnswer(isAnswerCorrect);
  }

  openCloseDialog() {
    this.savannahService.setPause(true);
    this.closeDialog.open(CloseGameDialogComponent);
    this.closeDialogSubsription = this.closeDialog.afterAllClosed.subscribe(() => {
      this.savannahService.setPause(false);
    });
  }

  resetGame() {
    this.savannahService.gameReset();
    this.savannahService.setGameState(GameState.SETTING);
  }
}
