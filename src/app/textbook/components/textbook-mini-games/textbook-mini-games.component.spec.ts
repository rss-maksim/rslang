import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextbookMiniGamesComponent } from './textbook-mini-games.component';

describe('TextbookMiniGamesComponent', () => {
  let component: TextbookMiniGamesComponent;
  let fixture: ComponentFixture<TextbookMiniGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextbookMiniGamesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextbookMiniGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
