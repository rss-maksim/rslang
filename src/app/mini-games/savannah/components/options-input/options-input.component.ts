import { WordModel } from './../../../../core/models/word.model';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-options-input',
  templateUrl: './options-input.component.html',
  styleUrls: ['./options-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsInputComponent implements OnInit {
  @Input() words!: WordModel[];
  @Output() clicked = new EventEmitter<WordModel>();

  constructor() {}

  ngOnInit(): void {
    return;
  }

  trackByFn(index: number) {
    return index;
  }

  wordClicked(word: WordModel): void {
    this.clicked.emit(word);
  }
}
