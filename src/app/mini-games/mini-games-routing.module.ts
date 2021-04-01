import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MiniGamesPageComponent } from './pages/mini-games-page/mini-games-page.component';
import { SprintMiniGameComponent } from './sprint/sprint-mini-game.component';
import { AudiochallengeMainComponent } from './audiochallenge/components/audiochallenge-main/audiochallenge-main.component';
import { CustomMiniGameComponent } from './custom-mini-game/custom-mini-game.component';
import { SavannahMiniGameComponent } from './savannah/pages/savannah-mini-game/savannah-mini-game.component';

const routes: Routes = [
  { path: 'sprint', component: SprintMiniGameComponent },
  { path: 'audiochallenge', component: AudiochallengeMainComponent },
  { path: 'savannah', component: SavannahMiniGameComponent },
  { path: 'custom-mini-game', component: CustomMiniGameComponent },
  { path: '', component: MiniGamesPageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiniGamesRoutingModule {}
