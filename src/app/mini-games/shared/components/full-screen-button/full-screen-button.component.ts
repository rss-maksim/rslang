import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, Inject, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-screen-button',
  templateUrl: './full-screen-button.component.html',
  styleUrls: ['./full-screen-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullScreenButtonComponent implements OnInit, OnDestroy {
  @Input() color = 'primary'; // primary || accent || warn || disabled
  elem!: Element;
  isFullScreen = false;
  constructor(@Inject(DOCUMENT) private document: any) {}

  ngOnInit(): void {
    this.checkScreenMode();
    this.elem = document.documentElement;
  }

  ngOnDestroy(): void {
    if (this.isFullScreen) {
      this.document.exitFullscreen();
    }
  }

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  fullscreenmodes(_event: any) {
    this.checkScreenMode();
  }

  checkScreenMode() {
    this.isFullScreen = Boolean(document.fullscreenElement);
  }

  changeScreen() {
    if (!this.isFullScreen) {
      this.elem.requestFullscreen();
    } else {
      this.document.exitFullscreen();
    }
  }
}
