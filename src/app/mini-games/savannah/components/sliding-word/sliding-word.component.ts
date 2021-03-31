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
import { Animations } from '../../utils/animations';

@Component({
  selector: 'app-sliding-word',
  templateUrl: './sliding-word.component.html',
  styleUrls: ['./sliding-word.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [Animations.wordSlide],
})
export class SlidingWordComponent implements AfterViewInit {
  @ViewChild('wordElement') wordElement!: ElementRef;
  @Input()
  word?: string;
  @Input() answerState?: string;
  @Output() wordGone = new EventEmitter();
  private slidePlayer!: AnimationPlayer;
  constructor(private builder: AnimationBuilder) {}

  ngAfterViewInit() {
    this.slidePlayer = this.builder
      .build([
        style({ opacity: 0 }),
        sequence([
          animate(200, style({ opacity: 1 })),
          animate(2800, style({ bottom: 0 })),
          animate(200, style({ opacity: 0 })),
        ]),
      ])
      .create(this.wordElement.nativeElement);
    this.slidePlayer.play();
    this.slidePlayer.onDone(this.wordGone.emit);
  }

  onAnimationEvent(event: any): void {
    console.log(event);
    if (event.fromState === null) {
      this.slidePlayer.destroy();
      this.wordGone.emit();
    }
  }
}
