import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidingWordComponent } from './sliding-word.component';

describe('SlidingWordComponent', () => {
  let component: SlidingWordComponent;
  let fixture: ComponentFixture<SlidingWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlidingWordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidingWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
