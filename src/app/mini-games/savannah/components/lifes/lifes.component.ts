import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lifes',
  templateUrl: './lifes.component.html',
  styleUrls: ['./lifes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LifesComponent {
  @Input() lifes!: number;
  constructor() {}

  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
