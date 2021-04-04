import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs/internal/observable/of';

import { SprintMiniGameComponent } from './sprint-mini-game.component';

export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of({ action: true }),
    };
  }
}

describe('SprintMiniGameComponent', () => {
  let component: SprintMiniGameComponent;
  let fixture: ComponentFixture<SprintMiniGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SprintMiniGameComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: MatDialog, useClass: MatDialogMock }],
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
