import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { TextbookPaginationComponent } from './textbook-pagination.component';

describe('TextbookPaginationComponent', () => {
  let component: TextbookPaginationComponent;
  let fixture: ComponentFixture<TextbookPaginationComponent>;
  let store: MockStore;
  let initialState = { textbook: { totalWordsInGroup: 1 } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextbookPaginationComponent],
      providers: [provideMockStore({ initialState })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextbookPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
