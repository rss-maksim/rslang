import { TestBed } from '@angular/core/testing';

import { TextbookHelperService } from './textbook-helper.service';

describe('TextbookHelperService', () => {
  let service: TextbookHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextbookHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
