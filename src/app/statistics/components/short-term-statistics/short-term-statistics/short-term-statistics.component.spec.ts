import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortTermStatisticsComponent } from './short-term-statistics.component';

describe('ShortTermStatisticsComponent', () => {
  let component: ShortTermStatisticsComponent;
  let fixture: ComponentFixture<ShortTermStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShortTermStatisticsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortTermStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
