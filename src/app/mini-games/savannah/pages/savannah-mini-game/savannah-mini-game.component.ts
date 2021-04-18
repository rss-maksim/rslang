import { MiniGamesSettingsService, ISettings } from './../../../../services/mini-games-settings.service';
import { ISavannahGame } from 'src/app/core/models/ISavannahGame';
import { SavannahService } from './../../services/savannah.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameState } from './../../../../core/models/ISavannahGame';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Games } from 'src/app/core/constants/mini-games';
import { MatDialog } from '@angular/material/dialog';
import { CloseGameDialogComponent } from 'src/app/mini-games/shared/components/close-game-dialog/close-game-dialog.component';
import { UserService } from 'src/app/core/services/user.service';
import { DEFAULT_DIFFICULTY_LEVEL } from 'src/app/core/constants/common';

@Component({
  selector: 'app-savannah-mini-game',
  templateUrl: './savannah-mini-game.component.html',
  styleUrls: ['./savannah-mini-game.component.scss'],
})
export class SavannahMiniGameComponent implements OnInit, OnDestroy {
  gameState = GameState;
  games = Games;
  game!: ISavannahGame;
  DEFAULT_DIFFICULTY_LEVEL = DEFAULT_DIFFICULTY_LEVEL;
  settings$!: ISettings;

  constructor(
    private savannahService: SavannahService,
    public closeDialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private settings: MiniGamesSettingsService,
  ) {}
  closeDialogSubsription?: Subscription;
  routeSubscription$?: Subscription;
  gameSubscription$?: Subscription;
  settingsSubscription$?: Subscription;

  ngOnInit() {
    this.gameSubscription$ = this.savannahService.game$.subscribe((game: ISavannahGame) => {
      this.game = game;
    });
    this.settingsSubscription$ = this.settings.gameSettings.subscribe((state) => {
      this.settings$ = state;
    });
    this.savannahService.setUserID(this.userService.getUserId());
    this.routeSubscription$ = this.route.queryParams.subscribe((params: any) => {
      this.savannahService.setQueryParams(params);
      // if (!!Object.keys(params).length) {
      //   this.savannahService.getWords(params['group'], params['page'], params['filter']);
      // }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription$?.unsubscribe();
    this.savannahService.gameReset();
    this.gameSubscription$?.unsubscribe();
    this.settingsSubscription$?.unsubscribe();
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
    if (this.game.gameState === GameState.PLAY) {
      this.savannahService.setPause(true);
      this.closeDialog.open(CloseGameDialogComponent);
      this.closeDialogSubsription = this.closeDialog.afterAllClosed.subscribe(() => {
        this.savannahService.setPause(false);
      });
    } else {
      this.router.navigate(['mini-games']);
    }
  }

  resetGame() {
    this.savannahService.gameReset();
    this.savannahService.setGameState(GameState.SETTING);
  }

  changeMute() {
    this.settings.changeMutedState();
  }
}
