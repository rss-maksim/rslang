import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextbookStatisticComponent } from './textbook-statistic.component';

describe('TextbookStatisticComponent', () => {
  let component: TextbookStatisticComponent;
  let fixture: ComponentFixture<TextbookStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextbookStatisticComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextbookStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
