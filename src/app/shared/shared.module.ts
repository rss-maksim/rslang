import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressComponent } from './components/progress/progress.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ProgressComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ProgressComponent],
})
export class SharedModule {}
