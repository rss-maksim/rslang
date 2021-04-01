import { TestBed } from '@angular/core/testing';

import { ShuffleService } from './shuffle.service';

describe('ShuffleService', () => {
  let service: ShuffleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShuffleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
