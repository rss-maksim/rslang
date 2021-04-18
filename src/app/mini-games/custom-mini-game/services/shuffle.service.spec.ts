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

  it('getRandomInt should return random number less than given', () => {
    expect(service.getRandomInt(5)).toBeLessThan(6);
  });

  it('shuffle should return array of same length as given word', () => {
    expect(service.shuffleLettersInWord('qwerty').join('').length).toEqual(6);
  });
});
