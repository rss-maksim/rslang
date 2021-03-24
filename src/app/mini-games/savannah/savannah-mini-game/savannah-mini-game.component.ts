import { Component, OnInit } from '@angular/core';

interface Word {
  word: string;
  chosen: boolean;
}
@Component({
  selector: 'app-savannah-mini-game',
  templateUrl: './savannah-mini-game.component.html',
  styleUrls: ['./savannah-mini-game.component.scss'],
})
export class SavannahMiniGameComponent implements OnInit {
  constructor() {}
  words: Word[] = [
    {
      word: 'water',
      chosen: false,
    },
    {
      word: 'cup',
      chosen: false,
    },
    {
      word: 'ball',
      chosen: false,
    },
    {
      word: 'floor',
      chosen: true,
    },
  ];
  ngOnInit(): void {
    return;
  }

  trackByFn(index: number) {
    return index;
  }
}
