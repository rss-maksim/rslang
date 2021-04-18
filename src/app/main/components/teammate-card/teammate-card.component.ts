import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Teammate } from 'src/app/redux/models/teammate.model';

@Component({
  selector: 'app-teammate-card',
  templateUrl: './teammate-card.component.html',
  styleUrls: ['./teammate-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeammateCardComponent {
  @Input() mate!: Teammate;
  constructor() {}

  trackByFn(index: number): number {
    return index;
  }
}
