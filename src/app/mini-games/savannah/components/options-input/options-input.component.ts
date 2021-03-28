import { IWord } from './../../../../core/models/IWord';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-options-input',
  templateUrl: './options-input.component.html',
  styleUrls: ['./options-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsInputComponent implements OnInit {
  @Input() words!: IWord[];
  @Output() clicked = new EventEmitter<IWord>();

  constructor() {}

  ngOnInit(): void {
    return;
  }

  trackByFn(index: number) {
    return index;
  }

  wordClicked(word: IWord): void {
    this.clicked.emit(word);
  }
}
