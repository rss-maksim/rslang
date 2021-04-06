import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsInputComponent } from './options-input.component';

describe('OptionsInputComponent', () => {
  let component: OptionsInputComponent;
  let fixture: ComponentFixture<OptionsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OptionsInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsInputComponent);
    component = fixture.componentInstance;
    component.options = ['1', '2', '3', '4'];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event', () => {
    const num = 3;
    spyOn(component.clicked, 'emit');
    component.wordClicked(num);
    expect(component.clicked.emit).toHaveBeenCalledWith(`${num + 1}`);
  });

  it('clicked word should emit its number', () => {
    spyOn(component.clicked, 'emit');
    const event = new KeyboardEvent('keydown', {
      key: '4',
    });
    component.keyEvent(event);
    fixture.detectChanges();
    expect(component.clicked.emit).toHaveBeenCalledWith('4');
  });
});
