import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSoundsButtonComponent } from './game-sounds-button.component';

describe('GameSoundsButtonComponent', () => {
  let component: GameSoundsButtonComponent;
  let fixture: ComponentFixture<GameSoundsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameSoundsButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSoundsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
