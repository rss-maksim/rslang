import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Games } from 'src/app/core/constants/mini-games';

import { DEFAULT_WORDS_DIFFICULTY } from 'src/app/core/constants/sprint-game';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartGameComponent implements OnInit, OnDestroy {
  @Input() hasDifficultySlider = true;
  @Input() gameName = '';
  @Input() textColor = 'black';
  @Output() difficultySelected = new EventEmitter();
  @Output() numOfRounds = new EventEmitter<number>();
  @Output() roundLength = new EventEmitter<number>();
  @Output() difficultyLevel = new EventEmitter<number>();
  @Output() startGame = new EventEmitter();
  difficulty = DEFAULT_WORDS_DIFFICULTY;
  GAMES = Games;
  group?: string | undefined;
  querySubscription?: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.querySubscription = this.route.queryParams.subscribe((queryParam: any) => {
      this.group = queryParam['group'];
      if (this.group) {
        this.difficulty = parseInt(this.group);
      }
    });
  }

  onDifficultyChange(value: number | null): void {
    if (value !== null) {
      this.difficulty = value;
      this.difficultyLevel.emit(value);
    }
  }

  onStartGame(): void {
    this.startGame.emit();
  }

  onStart(): void {
    this.onStartGame();
    if (this.hasDifficultySlider) {
      this.difficultySelected.emit(this.difficulty);
    } else {
      this.difficultySelected.emit(undefined);
    }
  }

  onSetNumOfRounds(value: number | null): void {
    if (value) {
      this.numOfRounds.emit(value);
    }
  }

  onSetRoundLength(value: number | null): void {
    if (value) {
      this.roundLength.emit(value);
    }
  }

  ngOnDestroy() {
    this.querySubscription?.unsubscribe();
  }
}
