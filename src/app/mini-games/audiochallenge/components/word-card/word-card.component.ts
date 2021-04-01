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
import { IAudiochallengeWord } from 'src/app/redux/models/audiochallenge.state.model';

@Component({
  selector: 'app-audiochallenge-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudiochallengeWordCardComponent implements OnChanges {
  @Input() word!: IAudiochallengeWord;
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
