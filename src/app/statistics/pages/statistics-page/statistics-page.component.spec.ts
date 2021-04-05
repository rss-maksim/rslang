import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { StatisticsPageComponent } from './statistics-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('StatisticsPageComponent', () => {
  let component: StatisticsPageComponent;
  let fixture: ComponentFixture<StatisticsPageComponent>;

  beforeEach(async () => {
    let store: MockStore;
    let initialState = {};
    await TestBed.configureTestingModule({
      declarations: [StatisticsPageComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MatTabsModule, BrowserAnimationsModule],
      providers: [provideMockStore({ initialState })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
