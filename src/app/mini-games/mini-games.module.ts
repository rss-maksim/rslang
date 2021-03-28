import { SavannahMiniGameComponent } from './savannah/savannah-mini-game/savannah-mini-game.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SprintMiniGameComponent } from './sprint/sprint-mini-game.component';
import { MiniGamesPageComponent } from './pages/mini-games-page/mini-games-page.component';
import { MiniGamesRoutingModule } from './mini-games-routing.module';
import { MaterialModule } from '../material/material.module';
import { FullScreenButtonComponent } from './shared/components/full-screen-button/full-screen-button.component';
import { CounterComponent } from './shared/components/counter/counter.component';
import { SprintGameCardComponent } from './sprint/components/sprint-game-card/sprint-game-card.component';
import { SprintGameStartComponent } from './sprint/components/sprint-game-start/sprint-game-start.component';
import { SprintGameEndComponent } from './sprint/components/sprint-game-end/sprint-game-end.component';
import { SprintGamePauseExitComponent } from './sprint/components/sprint-game-pause-exit/sprint-game-pause-exit.component';

@NgModule({
  declarations: [
    SprintMiniGameComponent,
    SavannahMiniGameComponent,
    MiniGamesPageComponent,
    FullScreenButtonComponent,
    CounterComponent,
    SprintGameCardComponent,
    SprintGameStartComponent,
    SprintGameEndComponent,
    SprintGamePauseExitComponent,
  ],
  imports: [CommonModule, MiniGamesRoutingModule, MaterialModule],
})
export class MiniGamesModule {}
