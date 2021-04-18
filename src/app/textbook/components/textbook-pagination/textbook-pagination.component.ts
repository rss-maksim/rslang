import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() totalCount!: number | null;
  constructor(private store: Store<AppState>) {}

  onPaginateChange(event: any) {
    this.paginationEvent.emit(event.pageIndex);
  }
}
