import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintGamePauseExitComponent } from './sprint-game-pause-exit.component';

describe('SprintGamePauseExitComponent', () => {
  let component: SprintGamePauseExitComponent;
  let fixture: ComponentFixture<SprintGamePauseExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SprintGamePauseExitComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintGamePauseExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
