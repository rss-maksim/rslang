import { SavannahMiniGameComponent } from './savannah/savannah-mini-game/savannah-mini-game.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SprintMiniGameComponent } from './sprint/sprint-mini-game.component';
import { MiniGamesPageComponent } from './pages/mini-games-page/mini-games-page.component';
import { MiniGamesRoutingModule } from './mini-games-routing.module';
import { MaterialModule } from '../material/material.module';
import { FullScreenButtonComponent } from './shared/components/full-screen-button/full-screen-button.component';
import { AudiochallengeMainComponent } from './audiochallenge/components/audiochallenge-main/audiochallenge-main.component';
import { AudiochallengeGameComponent } from './audiochallenge/components/audiochallenge-game/audiochallenge-game.component';
import { DecisionButtonsComponent } from './audiochallenge/components/decision-buttons/decision-buttons.component';
import { AudiochallengeWordCardComponent } from './audiochallenge/components/word-card/word-card.component';
import { TranslationOptionsComponent } from './audiochallenge/components/translation-options/translation-options.component';

@NgModule({
  declarations: [
    SprintMiniGameComponent,
    SavannahMiniGameComponent,
    MiniGamesPageComponent,
    FullScreenButtonComponent,
    AudiochallengeMainComponent,
    AudiochallengeGameComponent,
    DecisionButtonsComponent,
    AudiochallengeWordCardComponent,
    TranslationOptionsComponent,
  ],
  imports: [CommonModule, MiniGamesRoutingModule, MaterialModule],
})
export class MiniGamesModule {}
