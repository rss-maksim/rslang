import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SprintMiniGameComponent } from './sprint/sprint-mini-game.component';
import { MiniGamesPageComponent } from './pages/mini-games-page/mini-games-page.component';
import { MiniGamesRoutingModule } from './mini-games-routing.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [SprintMiniGameComponent, MiniGamesPageComponent],
  imports: [CommonModule, MiniGamesRoutingModule, MaterialModule],
})
export class MiniGamesModule {}
