import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< HEAD

import { ApiService } from '../core/services/api.service';
=======
import { Observable } from 'rxjs';

import { APIURL } from '../constants/constants';
import { IWord } from '../core/models/IWord';
>>>>>>> feat: add mvp sprint game

@Injectable({
  providedIn: 'root',
})
export class MiniGamesHttpService {
  constructor(private http: HttpClient, private api: ApiService) {}

<<<<<<< HEAD
  getWords() {
    return this.http.get(`${this.api.baseApiUrl}/words`);
  }

  getWordById(id: string) {
    console.log(id);
    return this.http.get(`${this.api.baseApiUrl}/words/${id}`);
=======
  getWords(group: number = 0, page: number = 0): Observable<IWord[]> {
    return this.http.get<IWord[]>(`${APIURL}/words?group=${group}&page=${page}`);
  }

  getWordById(id: string): Observable<IWord> {
    return this.http.get<IWord>(`${APIURL}/words/${id}`);
>>>>>>> feat: add mvp sprint game
  }
}
