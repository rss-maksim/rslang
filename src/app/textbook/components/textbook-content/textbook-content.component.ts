import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/models/state.model';
import { selectWords } from 'src/app/redux/selectors/textbook.selector';
import { deleteUserWords, loadWords, loadWordsSuccess } from '../../../redux/actions/textbooks.actions';
import { links } from './const';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { selectIsAuthorized } from 'src/app/redux/selectors/user.selector';
import { IWord } from 'src/app/redux/models/textbook.model';
import { ITextbookContentTabs } from 'src/app/core/models/ITextbookContentTabs';

@Component({
  selector: 'app-textbook-content',
  templateUrl: './textbook-content.component.html',
  styleUrls: ['./textbook-content.component.scss'],
})
export class TextbookContentComponent implements OnInit {
  currentGroup = '0';
  currentPage = '0';
  tabs = links;
  activeLink: any;
  wordItems$ = this.store.select(selectWords);
  isAuthorized$ = this.store.select(selectIsAuthorized);

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(({ group, page }: any) => {
      this.currentGroup = group || '0';
      this.currentPage = page || '0';
      this.store.dispatch(loadWords({ payload: { group, page, wordsPerPage: '20' } }));
    });
    this.activeLink = this.tabs[+this.currentGroup];
  }

  setCurrentGroup(group: string, tab: any) {
    this.activeLink = tab;
    this.router.navigate(['textbook', 'book', 'groups', group, 'pages', this.currentPage]);
  }

  onPaginateChange(event: any) {
    console.log('onPaginateChange', event.pageIndex);
    this.router.navigate(['textbook', 'book', 'groups', this.currentGroup, 'pages', event.pageIndex]);
  }

  trackByFnWordCard(index: number, item: IWord) {
    return item.id;
  }
  trackByFnTabs(index: number, item: ITextbookContentTabs) {
    return item.title;
  }
}
