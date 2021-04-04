import { MatTabsModule } from '@angular/material/tabs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { TextbookContentComponent } from './textbook-content.component';

describe('TextbookContentComponent', () => {
  let component: TextbookContentComponent;
  let fixture: ComponentFixture<TextbookContentComponent>;
  let store: MockStore;
  let initialState = { textbook: { isSoundOn: false }, user: { isAuthorized: false } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextbookContentComponent],
      imports: [RouterTestingModule, MatTabsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextbookContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
