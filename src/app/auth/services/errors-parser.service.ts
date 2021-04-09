import { Injectable } from '@angular/core';

import { defaultErrorText } from '../pages/signup/const';

interface FormControlError {
  path: string[];
  message: string;
}

export interface HttpError {
  status: string;
  errors: FormControlError[];
}

@Injectable({
  providedIn: 'root',
})
export class ErrorsParserService {
  constructor() {}

  parseError(error: HttpError): string {
    if (Array.isArray(error.errors) && error.errors.length) {
      const [{ message }] = error.errors;
      return message ?? defaultErrorText;
    }
    return defaultErrorText;
  }
}
