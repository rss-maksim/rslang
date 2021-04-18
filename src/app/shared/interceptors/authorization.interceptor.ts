import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StorageService } from '../../core/services/storage.service';
import { tokenKey } from '../../core/constants';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storage.getItem(tokenKey);
    const { url, method } = req;
    if (!token || (method === 'POST' && url.includes('/signin')) || (method === 'GET' && url.includes('/team'))) {
      return next.handle(req);
    }
    const clone = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    return next.handle(clone);
  }

  constructor(private storage: StorageService) {}
}
