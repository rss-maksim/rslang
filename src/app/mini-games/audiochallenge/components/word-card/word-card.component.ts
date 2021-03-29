import { Component, Input, ChangeDetectionStrategy, OnChanges, Output, EventEmitter } from '@angular/core';
import { IAudiochallengeWord } from 'src/app/redux/models/IAudiochallengeWord';
import { ASSETS_API_URL } from 'src/app/core/constants/mini-games';

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

  ngOnChanges() {
    this.path = `${ASSETS_API_URL}/${this.word.image}?raw=true`;
  }

  onPlay() {
    this.playEvent.emit();
  }
}
