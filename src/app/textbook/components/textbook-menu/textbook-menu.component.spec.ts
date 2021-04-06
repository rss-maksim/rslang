import { MatMenuModule } from '@angular/material/menu';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { TextbookMenuComponent } from './textbook-menu.component';

describe('TextbookMenuComponent', () => {
  let component: TextbookMenuComponent;
  let fixture: ComponentFixture<TextbookMenuComponent>;
  let store: MockStore;
  let initialState = { user: { isAuthorized: false }, textbook: { wordSettingsTranslation: true } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextbookMenuComponent],
      imports: [MatMenuModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextbookMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
