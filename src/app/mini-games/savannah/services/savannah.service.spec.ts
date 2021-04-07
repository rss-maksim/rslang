import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SavannahService } from './savannah.service';

describe('SavannahService', () => {
  let service: SavannahService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SavannahService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
