import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiService } from '../../core/services/api.service';
import { SigninPayloadModel, SignupRequestPayloadModel } from '../models/signin-payload.model';
import { StorageService } from '../../core/services/storage.service';
import { refreshTokenKey, tokenKey } from '../../core/constants';
import { fetchUser } from '../../redux/actions/user.actions';
import { AppState } from '../../redux/models/state.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private api: ApiService,
    private storage: StorageService,
    private router: Router,
    private store: Store<AppState>,
  ) {}

  register(payload: SignupRequestPayloadModel): Observable<Object> {
    return this.http.post(`${this.api.baseApiUrl}/users`, payload);
  }

  login(email: string, password: string): Observable<SigninPayloadModel> {
    return this.http
      .post<SigninPayloadModel>(`${this.api.baseApiUrl}/signin`, { email, password })
      .pipe(
        tap((payload: SigninPayloadModel) => {
          if (payload) {
            this.storage.setItem(tokenKey, payload.token);
            this.storage.setItem(refreshTokenKey, payload.refreshToken);
            this.store.dispatch(fetchUser({ payload: payload.userId }));
          }
        }),
      );
  }

  logout(): void {
    this.storage.removeItem(tokenKey);
    this.storage.removeItem(refreshTokenKey);
    this.router.navigate(['/auth/login']);
  }

  getUserToken(id: string): Observable<Object> {
    return this.http.get(`${this.api.baseApiUrl}/users/${id}/tokens`);
  }

  get isAuthorized(): boolean {
    return Boolean(this.storage.getItem(tokenKey));
  }
}
