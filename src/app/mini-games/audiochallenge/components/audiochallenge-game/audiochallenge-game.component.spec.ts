import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiochallengeGameComponent } from './audiochallenge-game.component';

describe('AudiochallengeGameComponent', () => {
  let component: AudiochallengeGameComponent;
  let fixture: ComponentFixture<AudiochallengeGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudiochallengeGameComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiochallengeGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
