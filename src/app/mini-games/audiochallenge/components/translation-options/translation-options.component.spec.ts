import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationOptionsComponent } from './translation-options.component';

describe('TranslationOptionsComponent', () => {
  let component: TranslationOptionsComponent;
  let fixture: ComponentFixture<TranslationOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranslationOptionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
