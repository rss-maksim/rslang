import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelChoiseComponent } from './level-choise.component';

describe('LevelChoiseComponent', () => {
  let component: LevelChoiseComponent;
  let fixture: ComponentFixture<LevelChoiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LevelChoiseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelChoiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
