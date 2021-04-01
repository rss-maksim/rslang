import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMiniGameComponent } from './custom-mini-game.component';

describe('CustomMiniGameComponent', () => {
  let component: CustomMiniGameComponent;
  let fixture: ComponentFixture<CustomMiniGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomMiniGameComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomMiniGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
