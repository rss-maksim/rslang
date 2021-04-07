import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartGameComponent } from './start-game.component';

describe('StartGameComponent', () => {
  let component: StartGameComponent;
  let fixture: ComponentFixture<StartGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartGameComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit round length when chosen', () => {
    spyOn(component.roundLength, 'emit');
    component.onSetRoundLength(1);
    expect(component.roundLength.emit).toHaveBeenCalledWith(1);
  });

  it('should emit rounds number when chosen', () => {
    spyOn(component.numOfRounds, 'emit');
    component.onSetNumOfRounds(1);
    expect(component.numOfRounds.emit).toHaveBeenCalledWith(1);
  });

  it('should emit difficulty level when start clicked', () => {
    spyOn(component.difficultySelected, 'emit');
    component.difficulty = 1;
    component.onStart();
    expect(component.difficultySelected.emit).toHaveBeenCalledWith(1);
    component.hasDifficultySlider = false; //if chosen not to have difficulty slider
    component.onStart();
    expect(component.difficultySelected.emit).toHaveBeenCalledWith(undefined);
  });
});
