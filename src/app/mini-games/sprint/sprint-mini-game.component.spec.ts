import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintMiniGameComponent } from './sprint-mini-game.component';

describe('SprintMiniGameComponent', () => {
  let component: SprintMiniGameComponent;
  let fixture: ComponentFixture<SprintMiniGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SprintMiniGameComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintMiniGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
