import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lifes',
  templateUrl: './lifes.component.html',
  styleUrls: ['./lifes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LifesComponent implements OnInit {
  @Input() lifes?: number;
  constructor() {}

  ngOnInit(): void {
    return;
  }
}
