import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IWord } from '../core/models/IWord';
import { ApiService } from '../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class MiniGamesHttpService {
  constructor(private http: HttpClient, private api: ApiService) {}

  getWords(group: number = 0, page: number = 0): Observable<IWord[]> {
    return this.http.get<IWord[]>(`${this.api.baseApiUrl}/words?group=${group}&page=${page}`);
  }

  getWordById(id: string): Observable<IWord> {
    return this.http.get<IWord>(`${this.api.baseApiUrl}/words/${id}`);
  }
}
