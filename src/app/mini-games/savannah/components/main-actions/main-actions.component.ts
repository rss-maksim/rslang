import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-main-actions',
  templateUrl: './main-actions.component.html',
  styleUrls: ['./main-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainActionsComponent {
  answerAnimation?: string;
  answer = false;
  @Input() word?: string;
  @Input() translation?: string;
  @Input() answers?: string[];
  @Input() lifes?: number;
  @Output() answered = new EventEmitter<boolean>();
  constructor() {}

  wordClicked(clickedWord: string): void {
    this.answer = clickedWord === this.translation;
    this.answerAnimation = this.answer ? 'right' : 'wrong';
  }

  wordGone(): void {
    this.answered.emit(this.answer);
  }
}
