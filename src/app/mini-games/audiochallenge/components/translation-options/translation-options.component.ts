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
@Component({
  selector: 'app-translation-options',
  templateUrl: './translation-options.component.html',
  styleUrls: ['./translation-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslationOptionsComponent implements OnChanges {
  @Input() options!: string[] | undefined;
  @Input() guessed!: boolean | null;
  @Input() rightAnswer!: string | undefined;

  @Output() translationEvent = new EventEmitter();

  choosedItem!: {
    option: string;
    isRight: boolean;
    isSelected: boolean;
  };
  selectedIndex!: number;
  optionsObjects!: {
    option: string;
    isRight: boolean;
    isSelected: boolean;
  }[];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options && this.options) {
      this.optionsObjects = this.options.map((option) => ({
        option,
        isRight: option === this.rightAnswer,
        isSelected: false,
      }));
    }
  }

  trackByIdentity = (index: number) => index;

  chooseTranslation(item: { option: string; isRight: boolean; isSelected: boolean }) {
    if (!this.guessed) {
      this.translationEvent.emit(item.option);
      this.chooseElement(item);
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (+event.key > 0 && +event.key < 6 && this.options && !this.guessed) {
      this.translationEvent.emit(this.options[+event.key - 1]);
      this.chooseElement(this.optionsObjects[+event.key - 1]);
    }
  }

  chooseElement(item: any) {
    this.optionsObjects.forEach((option) => {
      if (item.option === option.option) {
        option.isSelected = true;
      }
    });
  }

  getStyles(item: { option: string; isRight: boolean; isSelected: boolean }): string {
    if (!this.guessed) {
      return 'option__text';
    } else {
      if (item.isRight) {
        return 'option__text_right';
      } else if (item.isSelected && !item.isRight) {
        return 'option__text_wrong';
      } else {
        return 'option__text_not-choosen';
      }
    }
  }
}
