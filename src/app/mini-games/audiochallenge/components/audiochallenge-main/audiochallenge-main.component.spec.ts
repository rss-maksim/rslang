import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AudiochallengeMainComponent } from './audiochallenge-main.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AudiochallengeMainComponent', () => {
  let component: AudiochallengeMainComponent;
  let fixture: ComponentFixture<AudiochallengeMainComponent>;
  let store: MockStore;
  let initialState = { audiochallenge: { isGameStarted: false, isGameEnded: false, trainedWords: [] } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudiochallengeMainComponent],
      imports: [MatDialogModule, RouterTestingModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiochallengeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
