import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../material/material.module';
import { AboutTeamComponent } from './components/about-team/about-team.component';
import { TeammateCardComponent } from './components/teammate-card/teammate-card.component';
import { DemoComponent } from './components/demo/demo.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomePageComponent, AboutTeamComponent, TeammateCardComponent, DemoComponent],
  imports: [CommonModule, SharedModule, CoreModule, MaterialModule, RouterModule],
})
export class MainModule {}
