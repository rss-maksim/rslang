import { MiniGamesHttpService } from './../../../../services/mini-games-http.service';
import { Component, OnInit } from '@angular/core';
import { WordModel } from './../../../../core/models/word.model';

@Component({
  selector: 'app-savannah-mini-game',
  templateUrl: './savannah-mini-game.component.html',
  styleUrls: ['./savannah-mini-game.component.scss'],
})
export class SavannahMiniGameComponent implements OnInit {
  game = {};
  constructor(private service: MiniGamesHttpService) {}
  words: any;

  ngOnInit(): void {
    const words$ = this.service.getWords().subscribe((data: any) => (this.words = [...data.splice(-4)]));
    return;
  }
}
