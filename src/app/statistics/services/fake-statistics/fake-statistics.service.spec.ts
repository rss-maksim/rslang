import { TestBed } from '@angular/core/testing';

import { FakeStatisticsService } from './fake-statistics.service';

describe('FakeStatisticsService', () => {
  let service: FakeStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
