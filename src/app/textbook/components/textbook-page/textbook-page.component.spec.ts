import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TextbookPageComponent } from './textbook-page.component';

describe('TextbookPageComponent', () => {
  let component: TextbookPageComponent;
  let fixture: ComponentFixture<TextbookPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextbookPageComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextbookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
