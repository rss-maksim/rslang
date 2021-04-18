import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-textbook-statistic',
  templateUrl: './textbook-statistic.component.html',
  styleUrls: ['./textbook-statistic.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TextbookStatisticComponent {
  @Input() pageInfo!: {
    userWordsPerPage?: number;
    correctPerPage?: number;
    wrongPerPage?: number;
    userWordsPerGroup?: number;
    correctPerGroup?: number;
    wrongPerGroup?: number;
  } | null;
  @Input() title = 'Прогресс';
}
