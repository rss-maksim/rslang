import { SlidingWordComponent } from './../sliding-word/sliding-word.component';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-actions',
  templateUrl: './main-actions.component.html',
  styleUrls: ['./main-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainActionsComponent {
  @Input() word!: string;
  @Input() translation!: string;
  @Input() answers!: string[];
  @Input() lifes!: number;
  @Input() progress!: number;
  @Output()
  answered = new EventEmitter<boolean>();
  @ViewChild(SlidingWordComponent) private wordComponent!: SlidingWordComponent;
  constructor() {}

  wordClicked(clickedWord: string): void {
    const isAnswerCorrect = clickedWord === this.translation;
    this.wordComponent.animate(isAnswerCorrect);
  }

  wordGone(answer: boolean): void {
    this.answered.emit(answer);
  }
}
