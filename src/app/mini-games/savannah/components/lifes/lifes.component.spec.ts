import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LifesComponent } from './lifes.component';

describe('LifesComponent', () => {
  let component: LifesComponent;
  let fixture: ComponentFixture<LifesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LifesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('function should create array of length', () => {
    expect(component.numSequence(10).length).toEqual(10);
  });

  it('should draw needed anount of filled icons', () => {
    component.lifes = 4;
    fixture.detectChanges();
    const filledIcons = fixture.debugElement.queryAll(By.css('.icon_filled'));
    expect(filledIcons.length).toEqual(4);
  });

  it('should draw needed anount of bordered icons', () => {
    component.lifes = 3;
    fixture.detectChanges();
    const borderIcons = fixture.debugElement.queryAll(By.css('.icon_border'));
    expect(borderIcons.length).toEqual(5 - component.lifes);
  });

  it('should draw 5 icons', () => {
    component.lifes = 2;
    fixture.detectChanges();
    const filledIcons = fixture.debugElement.queryAll(By.css('.icon'));
    expect(filledIcons.length).toEqual(5);
  });
});
