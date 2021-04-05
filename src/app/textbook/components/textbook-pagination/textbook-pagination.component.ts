import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-textbook-pagination',
  templateUrl: './textbook-pagination.component.html',
  styleUrls: ['./textbook-pagination.component.scss'],
})
export class TextbookPaginationComponent {
  @Output() paginationEvent = new EventEmitter();
  @Input() currentPage!: string;
  onPaginateChange(event: any) {
    this.paginationEvent.emit(event.pageIndex);
  }
}
