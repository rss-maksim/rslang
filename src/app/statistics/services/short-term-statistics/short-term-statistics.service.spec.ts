import { TestBed } from '@angular/core/testing';

import { ShortTermStatisticsService } from './short-term-statistics.service';

describe('ShortTermStatisticsService', () => {
  let service: ShortTermStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortTermStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
