import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

import { StorageService } from '../../core/services/storage.service';
import { refreshTokenKey, tokenKey } from '../../core/constants';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          this.storage.removeItem(tokenKey);
          this.storage.removeItem(refreshTokenKey);
          this.router.navigateByUrl('/auth/login');
        }
        return throwError(errorResponse);
      }),
    );
  }

  constructor(private router: Router, private storage: StorageService) {}
}
