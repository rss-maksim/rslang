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

@NgModule({
  declarations: [
    SprintMiniGameComponent,
    SavannahMiniGameComponent,
    MiniGamesPageComponent,
    OptionsInputComponent,
    SlidingWordComponent,
    MainActionsComponent,
    FullScreenButtonComponent,
  ],
  imports: [CommonModule, MiniGamesRoutingModule, MaterialModule],
})
export class MiniGamesModule {}
