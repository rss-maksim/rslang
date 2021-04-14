import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { MaterialModule } from '../material/material.module';
import { ShortTermStatisticsComponent } from './components/short-term-statistics/short-term-statistics/short-term-statistics.component';
import { LongTermStatisticsComponent } from './components/long-term-statistics/long-term-statistics/long-term-statistics.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [StatisticsPageComponent, ShortTermStatisticsComponent, LongTermStatisticsComponent],
  imports: [CommonModule, MaterialModule, StatisticsRoutingModule, ChartsModule, SharedModule],
})
export class StatisticsModule {}
