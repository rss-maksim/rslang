import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryContentComponent } from './dictionary-content.component';

describe('DictionaryContentComponent', () => {
  let component: DictionaryContentComponent;
  let fixture: ComponentFixture<DictionaryContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DictionaryContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
