import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LongTermStatisticsService } from './long-term-statistics.service';

describe('LongTermStatisticsService', () => {
  let service: LongTermStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LongTermStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
