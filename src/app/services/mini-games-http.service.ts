import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiService } from '../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class MiniGamesHttpService {
  constructor(private http: HttpClient, private api: ApiService) {}

  getWords() {
    return this.http.get(`${this.api.baseApiUrl}/words`);
  }

  getWordById(id: string) {
    console.log(id);
    return this.http.get(`${this.api.baseApiUrl}/words/${id}`);
  }
}
