import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-actions',
  templateUrl: './main-actions.component.html',
  styleUrls: ['./main-actions.component.scss'],
})
export class MainActionsComponent implements OnInit {
  answerState = '';
  word = 'word';
  @Input() words!: [];
  constructor() {}

  ngOnInit(): void {
    return;
  }

  wordClicked(word: any) {
    this.answerState = this.answerState === 'right' ? 'right' : 'right';
  }
}
