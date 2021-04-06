import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/models/state.model';
import { selectTotalWordsInGroup } from 'src/app/redux/selectors/textbook.selector';

@Component({
  selector: 'app-textbook-pagination',
  templateUrl: './textbook-pagination.component.html',
  styleUrls: ['./textbook-pagination.component.scss'],
})
export class TextbookPaginationComponent {
  @Output() paginationEvent = new EventEmitter();
  @Input() currentPage!: string;
  totalCount = this.store.select(selectTotalWordsInGroup);

  constructor(private store: Store<AppState>) {}

  onPaginateChange(event: any) {
    this.paginationEvent.emit(event.pageIndex);
  }
}
