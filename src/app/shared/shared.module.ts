import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressComponent } from './components/progress/progress.component';
import { MaterialModule } from '../material/material.module';
import { FileInputComponent } from './components/file-input/file-input.component';

@NgModule({
  declarations: [ProgressComponent, FileInputComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ProgressComponent, FileInputComponent],
})
export class SharedModule {}
