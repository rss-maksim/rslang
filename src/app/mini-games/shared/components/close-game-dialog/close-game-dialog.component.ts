import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-close-game-dialog',
  templateUrl: './close-game-dialog.component.html',
  styleUrls: ['./close-game-dialog.component.scss'],
})
export class CloseGameDialogComponent {
  @Input() color = 'warn';
}
