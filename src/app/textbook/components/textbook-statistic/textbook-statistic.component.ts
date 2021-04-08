import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-textbook-statistic',
  templateUrl: './textbook-statistic.component.html',
  styleUrls: ['./textbook-statistic.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TextbookStatisticComponent {
  @Input() totalWordsCount = 0;
  @Input() correctWordsCount = 0;
  @Input() wrongWordsCount = 0;
  @Input() title = 'Прогресс';

  constructor() {}
}
