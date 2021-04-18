import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { DictionaryContentComponent } from './dictionary-content.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DictionaryContentComponent', () => {
  let component: DictionaryContentComponent;
  let fixture: ComponentFixture<DictionaryContentComponent>;
  let store: MockStore;
  let initialState = { user: { isAuthorized: true }, textbook: { words: [] } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DictionaryContentComponent],
      imports: [RouterTestingModule],
      providers: [provideMockStore({ initialState })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
