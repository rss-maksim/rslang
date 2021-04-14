import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { ASSETS_API_URL } from 'src/app/core/constants/mini-games';
import { ISpellingWord } from 'src/app/redux/models/spelling.state.model';

@Component({
  selector: 'app-spelling-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpellingWordCardComponent implements OnChanges {
  @Input() word!: ISpellingWord;
  @Input() guessed!: boolean | null;
  @Output() playEvent = new EventEmitter();
  path!: string;
  constPath = ASSETS_API_URL;

  ngOnChanges() {
    this.path = `${ASSETS_API_URL}/${this.word.image}?raw=true`;
  }

  onPlay() {
    this.playEvent.emit();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === ' ') {
      this.onPlay();
    }
  }
}
