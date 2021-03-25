import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiochallengeWordComponent } from './audiochallenge-word.component';

describe('WordComponent', () => {
  let component: AudiochallengeWordComponent;
  let fixture: ComponentFixture<AudiochallengeWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudiochallengeWordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiochallengeWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
