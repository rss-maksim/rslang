import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ITextbookContentTabs } from 'src/app/core/models/ITextbookContentTabs';
import { links } from '../textbook-content/const';

@Component({
  selector: 'app-textbook-tab-nav',
  templateUrl: './textbook-tab-nav.component.html',
  styleUrls: ['./textbook-tab-nav.component.scss'],
})
export class TextbookTabNavComponent implements OnInit {
  @Input() routePath!: string;
  @Input() currentGroup!: string;
  tabs = links;
  activeLink: any;
  @Output() changeGroupEvent = new EventEmitter();

  ngOnInit() {
    this.activeLink = this.tabs[+this.currentGroup];
  }

  setCurrentGroup(group: string, tab: any) {
    this.activeLink = tab;
    this.changeGroupEvent.emit(group);
  }

  trackByFnTabs(index: number, item: ITextbookContentTabs) {
    return item.title;
  }
}
