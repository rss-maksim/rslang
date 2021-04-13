import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/models/state.model';
import { loadHardWords, loadWords, updateUserWord, updateGroupStats } from '../../../redux/actions/textbooks.actions';
import {
  pageStatsInfo,
  selectLoading,
  selectTotalWordsInGroup,
  selectWords,
} from 'src/app/redux/selectors/textbook.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { IWord } from 'src/app/redux/models/textbook.model';
import { selectIsAuthorized } from 'src/app/redux/selectors/user.selector';
import { links } from '../textbook-content/const';
import { filters } from 'src/app/core/constants/textbook';
import { Subscription } from 'rxjs';
import { selectGroupStatsInfo } from '../../../redux/selectors/textbook.selector';

@Component({
  selector: 'app-dictionary-content',
  templateUrl: './dictionary-content.component.html',
  styleUrls: ['./dictionary-content.component.scss'],
})
export class DictionaryContentComponent implements OnInit, OnDestroy {
  groupStatisticTitle = 'Прогресс по разделу';
  pageStatisticTitle = 'Прогресс по странице';
  currentGroup = '0';
  currentPage = '0';
  filter = '';
  tabs = links;
  activeLink: any;
  wordItems$ = this.store.select(selectWords);
  isAuthorized$ = this.store.select(selectIsAuthorized);
  pageStatsInfo = this.store.select(pageStatsInfo);
  groupStatsInfo = this.store.select(selectGroupStatsInfo);
  totalCount = this.store.select(selectTotalWordsInGroup);
  isLoading$ = this.store.select(selectLoading);
  private querySubscription!: Subscription;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public location: Location,
  ) {}

  ngOnInit() {
    this.querySubscription = this.activatedRoute.queryParams.subscribe((queryParam: any) => {
      this.currentGroup = queryParam['group'];
      this.currentPage = queryParam['page'];
      this.filter = queryParam['filter'];
      this.store.dispatch(
        loadWords({
          payload: {
            page: this.currentPage,
            group: this.currentGroup,
            filter: filters[this.filter],
          },
        }),
      );
      this.store.dispatch(
        updateGroupStats({
          payload: {
            page: this.currentPage,
            group: this.currentGroup,
            filter: filters[this.filter],
          },
        }),
      );
    });
    this.activeLink = this.tabs[+this.currentGroup];
  }

  setCurrentGroup(group: string) {
    this.currentGroup = group;
    this.currentPage = '0';
    this.router.navigate(['textbook/dictionary'], {
      queryParams: {
        filter: this.filter,
        page: this.currentPage,
        group: this.currentGroup,
      },
    });
  }

  onPaginateChange(page: any) {
    this.currentPage = page;
    this.router.navigate(['textbook/dictionary'], {
      queryParams: {
        filter: this.filter,
        page: this.currentPage,
        group: this.currentGroup,
      },
    });
  }

  trackByFnWordCard(index: number, item: IWord) {
    return item.id;
  }

  updateUserWord(event: any) {
    this.store.dispatch(
      updateUserWord({
        payload: {
          word: event.word,
          page: this.currentPage,
          group: this.currentGroup,
          difficulty: event.difficulty,
          filter: this.filter,
        },
      }),
    );
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
