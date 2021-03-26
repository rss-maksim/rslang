import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

import { StorageService } from './storage.service';
import { tokenKey } from '../constants';
import { TokenPayload } from '../models/user.model';
import { UserModel } from '../../redux/models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private storage: StorageService, private http: HttpClient, private api: ApiService) {}

  getUser(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.api.baseApiUrl}/users/${id}`);
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      const { id } = this.decodeToken(token);
      return id;
    }
    return null;
  }

  getToken(): string | null {
    return this.storage.getItem(tokenKey);
  }

  decodeToken(token: string): TokenPayload {
    return jwtDecode<TokenPayload>(token);
  }
}
