import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTermStatisticsComponent } from './long-term-statistics.component';

describe('LongTermStatisticsComponent', () => {
  let component: LongTermStatisticsComponent;
  let fixture: ComponentFixture<LongTermStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LongTermStatisticsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LongTermStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
