import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should devide progress incrementation according to counts', () => {
    component.count = 10;
    component.ngOnInit();
    expect(component.increment).toEqual(100 / component.count);
  });

  it('should emit event about count ending', fakeAsync(() => {
    spyOn(component.countIsOver, 'emit');
    component.count = 1;
    component.ngOnInit();
    tick(2000);
    expect(component.countIsOver.emit).toHaveBeenCalled();
  }));

  it('should pause spinner if isPause changes to false', fakeAsync(() => {
    component.isPaused = true;
    component.count = 1;
    component.ngOnInit();
    tick(1000);
    expect(component.spinnerMode).toEqual('indeterminate');
    discardPeriodicTasks();
  }));
});
