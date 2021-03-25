import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SprintMiniGameComponent } from './sprint/sprint-mini-game.component';
import { SavannahMiniGameComponent } from './savannah/pages/savannah-mini-game/savannah-mini-game.component';
import { MiniGamesPageComponent } from './pages/mini-games-page/mini-games-page.component';
import { MiniGamesRoutingModule } from './mini-games-routing.module';
import { MaterialModule } from '../material/material.module';
import { FullScreenButtonComponent } from './shared/components/full-screen-button/full-screen-button.component';
import { OptionsInputComponent } from './savannah/components/options-input/options-input.component';

@NgModule({
  declarations: [
    SprintMiniGameComponent,
    SavannahMiniGameComponent,
    MiniGamesPageComponent,
    FullScreenButtonComponent,
    OptionsInputComponent,
  ],
  imports: [CommonModule, MiniGamesRoutingModule, MaterialModule],
})
export class MiniGamesModule {}
