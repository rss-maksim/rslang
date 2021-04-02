import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavannahMiniGameComponent } from './savannah-mini-game.component';

describe('SavannahMiniGameComponent', () => {
  let component: SavannahMiniGameComponent;
  let fixture: ComponentFixture<SavannahMiniGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavannahMiniGameComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavannahMiniGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
