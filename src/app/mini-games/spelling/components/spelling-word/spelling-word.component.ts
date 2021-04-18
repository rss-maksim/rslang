import {
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-spelling-word',
  templateUrl: './spelling-word.component.html',
  styleUrls: ['./spelling-word.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpellingWordComponent implements OnChanges {
  @Input() currentWord!: any;
  @Output() checkAnswer = new EventEmitter();
  @Output() guessEvent = new EventEmitter();
  @Output() nextWordEvent = new EventEmitter();
  @ViewChild('wordForm') wordForm?: ElementRef;
  isGuessed = false;
  selectedIndex = 0;

  ngOnChanges(changes: SimpleChanges) {
    this.isGuessed = false;

    if (this.wordForm) {
      this.wordForm.nativeElement.classList.remove('spelling__correct');
      this.wordForm.nativeElement.classList.remove('spelling__wrong');

      const children: HTMLInputElement[] = this.wordForm.nativeElement.children;
      [...children].forEach((char, index) => {
        if (index === 0) {
          this.selectedIndex = index;
          char.focus();
        }
        char.value = '';
      });
    }
  }

  trackByIdentity = (index: number) => index;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.selectedIndex === undefined) return;

    switch (event.key) {
      case 'ArrowRight':
        if (this.selectedIndex < this.currentWord.word.length - 1) {
          this.selectedIndex += 1;
          this.wordForm?.nativeElement.children[this.selectedIndex].focus();
        }
        break;

      case 'ArrowLeft':
        if (this.selectedIndex > 0) {
          this.selectedIndex -= 1;
          this.wordForm?.nativeElement.children[this.selectedIndex].focus();
        }
        break;

      case 'Backspace':
        if (this.wordForm) {
          this.wordForm.nativeElement.children[this.selectedIndex].value = '';
        }
        if (this.selectedIndex > 0) {
          this.selectedIndex -= 1;
          this.wordForm?.nativeElement.children[this.selectedIndex].focus();
        }
        break;

      case 'Delete':
        if (this.wordForm) {
          this.wordForm.nativeElement.children[this.selectedIndex].value = '';
        }
        break;

      case 'Enter':
        if (
          this.isGuessed ||
          this.wordForm?.nativeElement.classList.contains('spelling__correct') ||
          this.wordForm?.nativeElement.classList.contains('spelling__wrong')
        ) {
          this.nextWordEvent.emit();
        } else {
          const word = this.getSpelledWord();
          (<HTMLElement>document.activeElement).blur();
          this.changeStyle(word, this.currentWord.word);
          this.checkAnswer.emit(word);
          this.isGuessed = true;
        }
        break;

      case ' ':
        break;

      default:
        if (/^[a-z]$/.test(event.key) && this.wordForm) {
          this.wordForm.nativeElement.children[this.selectedIndex].value = event.key;
        }

        if (this.selectedIndex < this.currentWord.word.length - 1) {
          this.selectedIndex += 1;
          this.wordForm?.nativeElement.children[this.selectedIndex].focus();
        }
        break;
    }
  }

  onLettersClick(event: Event) {
    const index = (<HTMLInputElement>event.target)?.name;
    if (index !== undefined) {
      this.selectedIndex = +index;
    }
  }

  private changeStyle(word: string, currentWord: string) {
    if (word.toLowerCase() === currentWord.toLowerCase()) {
      this.wordForm?.nativeElement.classList.add('spelling__correct');
    } else {
      this.wordForm?.nativeElement.classList.add('spelling__wrong');
    }
  }

  private getSpelledWord(): string {
    let word = '';

    if (this.wordForm) {
      const children: HTMLInputElement[] = this.wordForm.nativeElement.children;
      [...children].forEach((char) => {
        word += char.value;
      });
    }
    return word;
  }
}
