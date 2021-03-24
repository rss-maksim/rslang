import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sprint-mini-game',
  templateUrl: './sprint-mini-game.component.html',
  styleUrls: ['./sprint-mini-game.component.scss'],
})
export class SprintMiniGameComponent implements OnInit {
  isPaused = false;
  countIsOver = false;

  ngOnInit() {
    setTimeout(() => (this.isPaused = true), 5000);
    setTimeout(() => (this.isPaused = false), 10000);
  }

  removeCounter() {
    console.log('you can remove counter');
    this.countIsOver = true;
  }
}
