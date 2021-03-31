import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiochallengeMainComponent } from './audiochallenge-main.component';

describe('AudiochallengeMainComponent', () => {
  let component: AudiochallengeMainComponent;
  let fixture: ComponentFixture<AudiochallengeMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudiochallengeMainComponent],
    }).compileComponents();
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
