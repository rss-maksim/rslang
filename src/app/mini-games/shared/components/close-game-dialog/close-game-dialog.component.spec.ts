import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseGameDialogComponent } from './close-game-dialog.component';

describe('CloseGameDialogComponent', () => {
  let component: CloseGameDialogComponent;
  let fixture: ComponentFixture<CloseGameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CloseGameDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
