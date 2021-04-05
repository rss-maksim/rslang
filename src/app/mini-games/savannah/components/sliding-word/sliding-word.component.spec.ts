import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidingWordComponent } from './sliding-word.component';
import { By } from '@angular/platform-browser';

describe('SlidingWordComponent', () => {
  let component: SlidingWordComponent;
  let fixture: ComponentFixture<SlidingWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlidingWordComponent],
      imports: [BrowserAnimationsModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidingWordComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have word container', () => {
    expect(fixture.debugElement.query(By.css('.word-container'))).toBeTruthy();
  });

  it('should draw inputed word in lower case', () => {
    const example = 'TABLE';
    component.word = example;
    fixture.detectChanges();
    const textElement = fixture.debugElement.query(By.css('.word-container')).nativeElement.innerHTML;
    expect(textElement).toContain(example.toLowerCase());
  });

  it('should emit event', () => {
    spyOn(component.wordGone, 'emit');
    component.emit(true);
    expect(component.wordGone.emit).toHaveBeenCalledWith(true);
  });
});
