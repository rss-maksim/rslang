import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomMiniGameComponent } from '../custom-mini-game.component';

@Component({
  selector: 'app-close-dialog',
  templateUrl: './close-dialog.component.html',
  styleUrls: ['./close-dialog.component.scss'],
})
export class CloseDialogComponent {
  constructor(public dialogRef: MatDialogRef<CustomMiniGameComponent>, @Inject(DOCUMENT) private document: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCloseGame(): void {
    if (this.document.fullscreenElement !== null) {
      this.document.exitFullscreen(); // Выходим из Full Screen Mode, если находимся в нем
    }
    this.dialogRef.close();
  }
}
