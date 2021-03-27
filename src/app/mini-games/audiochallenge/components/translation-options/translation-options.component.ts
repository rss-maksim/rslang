import {
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  HostListener,
} from '@angular/core';
import { MiniGamesHttpService } from 'src/app/services/mini-games-http.service';

@Component({
  selector: 'app-translation-options',
  templateUrl: './translation-options.component.html',
  styleUrls: ['./translation-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslationOptionsComponent implements OnChanges {
  @Input() options!: string[] | undefined;
  @Output() translationEvent = new EventEmitter();
  @Input() guessed!: boolean;
  showOptions!: string[];

  constructor(private service: MiniGamesHttpService) {}

  ngOnChanges(): void {
    if (this.options) {
      this.options = this.service.shuffleArray([...this.options]);
    }
  }

  trackByIdentity = (index: number, item: any) => item;

  chooseTranslation(item: string) {
    if (!this.guessed) {
      console.log(item);
      this.translationEvent.emit(item);
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (+event.key > 0 && +event.key < 6 && this.options && !this.guessed) {
      console.log(event);
      this.translationEvent.emit(this.options[+event.key - 1]);
    }
  }
}
