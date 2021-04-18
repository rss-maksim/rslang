import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationOptionsComponent } from './translation-options.component';

describe('TranslationOptionsComponent', () => {
  let component: TranslationOptionsComponent;
  let fixture: ComponentFixture<TranslationOptionsComponent>;
  let optionsMock = ['word1', 'word2', 'word3', 'word4', 'word5'];
  let optionsObjectsMock = [
    {
      option: 'word1',
      isRight: false,
      isSelected: false,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranslationOptionsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.options = optionsMock;
    component.optionsObjects = optionsObjectsMock;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selected word option', () => {
    spyOn(component.translationEvent, 'emit');
    const keyup = new KeyboardEvent('keyup', { key: '1' });
    component.keyEvent(keyup);
    expect(component.translationEvent.emit).toHaveBeenCalledWith('word1');
    expect(component.optionsObjects[0].isSelected).toEqual(true);
  });

  it('should emit selected word if it is not guessed', () => {
    spyOn(component.translationEvent, 'emit');
    component.chooseTranslation(optionsObjectsMock[0]);
    expect(component.translationEvent.emit).toHaveBeenCalledWith(optionsObjectsMock[0].option);
  });
});
