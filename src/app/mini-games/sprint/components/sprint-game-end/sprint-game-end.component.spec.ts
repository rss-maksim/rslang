import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintGameEndComponent } from './sprint-game-end.component';

describe('SprintGameEndComponent', () => {
  let component: SprintGameEndComponent;
  let fixture: ComponentFixture<SprintGameEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SprintGameEndComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintGameEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
