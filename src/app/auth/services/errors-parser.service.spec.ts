import { defaultErrorText } from './../pages/signup/const';
import { TestBed } from '@angular/core/testing';
import { ErrorsParserService, HttpError } from './errors-parser.service';
describe('AuthService', () => {
  let service: ErrorsParserService;
  const initialState = { isAuthorized: false };
  let errorMock: HttpError = {
    status: '400',
    errors: [{ path: [], message: 'error' }],
  };
  let emptyMock: HttpError = {
    status: '200',
    errors: [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorsParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return error message', () => {
    expect(service.parseError(errorMock)).toEqual(errorMock.errors[0].message);
  });

  it('should return default error message', () => {
    expect(service.parseError(emptyMock)).toEqual(defaultErrorText);
  });
});
