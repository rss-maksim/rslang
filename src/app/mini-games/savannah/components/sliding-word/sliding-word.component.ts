import { SavannahService } from './../../services/savannah.service';
import { animate, AnimationBuilder, AnimationPlayer, sequence, style } from '@angular/animations';

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-sliding-word',
  templateUrl: './sliding-word.component.html',
  styleUrls: ['./sliding-word.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlidingWordComponent implements OnChanges, AfterViewInit {
  @ViewChild('wordElement') wordElement!: ElementRef;
  @Input() word!: string;
  @Output() wordGone = new EventEmitter<boolean>();
  private slidePlayer!: AnimationPlayer;
  private rightPlayer!: AnimationPlayer;
  private wrongPlayer!: AnimationPlayer;
  constructor(private builder: AnimationBuilder, private savannahService: SavannahService) {}
  unClicked = 'slide';

  ngOnChanges(changes: any) {
    if (changes.word.previousValue) {
      this.destroy(this.unClicked);
      this.unClicked = 'slide';
      this.wordElement.nativeElement.style = { bottom: '*', width: 'fit-content', opacity: 1 };
      this.slideAnimation();
    }
  }

  ngAfterViewInit() {
    this.slideAnimation();
  }

  animate(bool: boolean) {
    if (this.unClicked !== 'slide') {
      return;
    }
    this.unClicked = bool ? 'right' : 'wrong';
    this.destroy('slide');
    bool ? this.rightAnimation() : this.wrongAnimation();
  }

  slideAnimation() {
    this.slidePlayer = this.builder
      .build([
        style({ opacity: 0 }),
        sequence([
          animate(200, style({ opacity: 1 })),
          animate(3600, style({ bottom: 0 })),
          animate(200, style({ opacity: 0 })),
        ]),
      ])
      .create(this.wordElement.nativeElement);
    this.slidePlayer.play();
    this.slidePlayer.onDone(() => {
      if (this.unClicked === 'slide') {
        this.savannahService.playSound(false);
        this.emit(false);
      }
    });
  }

  rightAnimation() {
    this.rightPlayer = this.builder
      .build([animate(300, style({ width: '1px', overflow: 'hidden', bottom: 0 }))])
      .create(this.wordElement.nativeElement);
    this.rightPlayer.play();
    this.rightPlayer.onDone(() => {
      this.emit(true);
    });
  }

  wrongAnimation() {
    this.wrongPlayer = this.builder.build([animate(200, style({ top: 0 }))]).create(this.wordElement.nativeElement);
    this.wrongPlayer.play();
    this.wrongPlayer.onDone(() => {
      this.emit(false);
    });
  }

  destroy(player: string) {
    if (player == 'slide') {
      this.slidePlayer.destroy();
    } else if (player == 'right') {
      this.rightPlayer.destroy();
    } else if (player == 'wrong') {
      this.wrongPlayer.destroy();
    }
  }
  emit(answer: boolean) {
    this.wordGone.emit(answer);
  }
}
