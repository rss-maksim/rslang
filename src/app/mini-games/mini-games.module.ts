import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SprintMiniGameComponent } from './sprint/sprint-mini-game.component';
import { MiniGamesRoutingModule } from './mini-games-routing.module';
import { MaterialModule } from '../material/material.module';
import { FullScreenButtonComponent } from './shared/components/full-screen-button/full-screen-button.component';
import { MiniGamesPageComponent } from './pages/mini-games-page/mini-games-page.component';
import { MainActionsComponent } from './savannah/components/main-actions/main-actions.component';
import { OptionsInputComponent } from './savannah/components/options-input/options-input.component';
import { SlidingWordComponent } from './savannah/components/sliding-word/sliding-word.component';
import { SavannahMiniGameComponent } from './savannah/pages/savannah-mini-game/savannah-mini-game.component';
import { CounterComponent } from './shared/components/counter/counter.component';
import { SprintGameCardComponent } from './sprint/components/sprint-game-card/sprint-game-card.component';
import { SprintGameStartComponent } from './sprint/components/sprint-game-start/sprint-game-start.component';
import { SprintGameEndComponent } from './sprint/components/sprint-game-end/sprint-game-end.component';
import { SprintGamePauseExitComponent } from './sprint/components/sprint-game-pause-exit/sprint-game-pause-exit.component';
import { LifesComponent } from './savannah/components/lifes/lifes.component';
import { RepeatsDirective } from './shared/directives/repeats.directive';
import { DifficultyyInputComponent } from './savannah/components/difficultyy-input/difficultyy-input.component';

@NgModule({
  declarations: [
    SprintMiniGameComponent,
    SavannahMiniGameComponent,
    MiniGamesPageComponent,
    OptionsInputComponent,
    SlidingWordComponent,
    MainActionsComponent,
    FullScreenButtonComponent,
    FullScreenButtonComponent,
    CounterComponent,
    SprintGameCardComponent,
    SprintGameStartComponent,
    SprintGameEndComponent,
    SprintGamePauseExitComponent,
    LifesComponent,
    RepeatsDirective,
    DifficultyyInputComponent,
  ],
  imports: [CommonModule, MiniGamesRoutingModule, MaterialModule],
})
export class MiniGamesModule {}
