import { Word } from './../../models/word.model';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-options-input',
  templateUrl: './options-input.component.html',
  styleUrls: ['./options-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsInputComponent implements OnInit {
  @Input() words!: Word[];
  @Output() clicked = new EventEmitter<Word>();

  constructor() {}

  ngOnInit(): void {
    return;
  }

  trackByFn(index: number) {
    return index;
  }

  wordClicked(word: Word): void {
    this.clicked.emit(word);
  }
}
