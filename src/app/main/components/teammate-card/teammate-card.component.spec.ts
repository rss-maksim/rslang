import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeammateCardComponent } from './teammate-card.component';

describe('TeammateCardComponent', () => {
  let component: TeammateCardComponent;
  let fixture: ComponentFixture<TeammateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeammateCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeammateCardComponent);
    component = fixture.componentInstance;
    component.mate = {
      id: '605783a30a770f3787689d22',
      contribution: [
        'Распределение задач',
        'Проведение митингов',
        'Подключение и интеграция с back-end',
        'Реализация главной страницы (о приложении, о команде)',
      ],
      name: 'Maksim Kirilko',
      role: 'Team Leader',
      location: 'Minsk, Belarus',
      github: 'https://github.com/rss-maksim',
      pictureUrl:
        'https://avatars.githubusercontent.com/u/55359688?s=460&u=2d5bb5d0dbd2a34898740d49dc6e6d8ff6c9d7e6&v=4',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});