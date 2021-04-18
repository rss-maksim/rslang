import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionButtonsComponent } from './decision-buttons.component';

describe('DecisionButtonsComponent', () => {
  let component: DecisionButtonsComponent;
  let fixture: ComponentFixture<DecisionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DecisionButtonsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('guess function should emit guessEvent', () => {
    spyOn(component.guessEvent, 'emit');
    component.guess();
    expect(component.guessEvent.emit).toHaveBeenCalled();
  });

  it('nextWord function should emit nextWordEvent', () => {
    spyOn(component.nextWordEvent, 'emit');
    component.nextWord();
    expect(component.nextWordEvent.emit).toHaveBeenCalled();
  });

  it('keyboard event should emit proper event', () => {
    spyOn(component.guessEvent, 'emit');
    const keyup = new KeyboardEvent('keyup', { key: 'Enter' });
    component.keyEvent(keyup);
    fixture.detectChanges();
    expect(component.guessEvent.emit).toHaveBeenCalled();

    spyOn(component.nextWordEvent, 'emit');
    component.guessed = true;
    component.keyEvent(keyup);
    fixture.detectChanges();
    expect(component.nextWordEvent.emit).toHaveBeenCalled();
  });
});
