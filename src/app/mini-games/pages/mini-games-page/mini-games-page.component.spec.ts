import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniGamesPageComponent } from './mini-games-page.component';

describe('MiniGamesPageComponent', () => {
  let component: MiniGamesPageComponent;
  let fixture: ComponentFixture<MiniGamesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiniGamesPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniGamesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
