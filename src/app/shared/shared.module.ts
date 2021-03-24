import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CounterComponent } from './components/counter/counter.component';
import { ProgressComponent } from './components/progress/progress.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [CounterComponent, ProgressComponent],
  imports: [CommonModule, MaterialModule],
  exports: [CounterComponent, ProgressComponent],
})
export class SharedModule {}
