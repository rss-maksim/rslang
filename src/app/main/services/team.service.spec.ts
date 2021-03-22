import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TeamService } from './team.service';
import { Teammate } from '../../redux/models/teammate.model';

describe('TeamService', () => {
  const baseUrl = 'https://guarded-eyrie-57031.herokuapp.com';
  let service: TeamService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(TeamService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable of 2 teammates', () => {
    const hardcodedTeammates: Teammate[] = [
      {
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
      },
      {
        id: '60578b4d0a770f3787689d23',
        contribution: ["Мини игра 'Саванна'"],
        name: 'Arslan Tadjiev',
        role: 'Developer',
        location: '',
        github: 'https://github.com/Ars6300',
        pictureUrl:
          'https://avatars.githubusercontent.com/u/28512469?s=460&u=e55656e92bb7e22c9536ceded314da7eb71fed1b&v=4',
      },
    ];
    let teammates: Teammate[] = [];
    service.getAll().subscribe((team: Object) => {
      teammates = team as Teammate[];
    });

    http.expectOne(`${baseUrl}/team`).flush(hardcodedTeammates);

    expect(teammates.length).toBe(2);
  });
});
