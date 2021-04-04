import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiochallengeWordCardComponent } from './word-card.component';

describe('WordCardComponent', () => {
  let component: AudiochallengeWordCardComponent;
  let fixture: ComponentFixture<AudiochallengeWordCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudiochallengeWordCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiochallengeWordCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
