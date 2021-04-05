import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import {
  AggregatedWordsRequestParams,
  CountResponsePayload,
  UserWordModel,
  WordModel,
  WordRequestParams,
  WordsRequestParams,
} from '../models/word.model';
import { IWord } from '../models/IWord';

interface HttpParams {
  [param: string]: string | string[];
}

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  apiUrl: string;

  constructor(private http: HttpClient, private api: ApiService) {
    this.apiUrl = api.baseApiUrl;
  }

  getAll(params?: WordsRequestParams): Observable<WordModel[]> {
    return this.http.get<WordModel[]>(`${this.apiUrl}/words`, { params: params as HttpParams });
  }

  getCount(params?: WordsRequestParams): Observable<CountResponsePayload> {
    return this.http.get<CountResponsePayload>(`${this.apiUrl}/words/count`, { params: params as HttpParams });
  }

  getWord(id: string, params?: WordRequestParams): Observable<WordModel> {
    return this.http.get<WordModel>(`${this.apiUrl}/words/${id}`, { params: params as HttpParams });
  }

  getUserWords(userId: string): Observable<UserWordModel[]> {
    return this.http.get<UserWordModel[]>(`${this.apiUrl}/users/${userId}/words`);
  }

  getUserWord(userId: string, wordId: string): Observable<UserWordModel> {
    return this.http.get<UserWordModel>(`${this.apiUrl}/users/${userId}/words/${wordId}`);
  }

  createUserWord(userId: string | null, wordId: string, body: UserWordModel): Observable<UserWordModel> {
    console.log(userId, wordId, body, 'createUserWord');
    return this.http.post<UserWordModel>(`${this.apiUrl}/users/${userId}/words/${wordId}`, body);
  }

  updateUserWord(userId: string | null, wordId: string, body: UserWordModel): Observable<UserWordModel> {
    return this.http.put<UserWordModel>(`${this.apiUrl}/users/${userId}/words/${wordId}`, body);
  }

  deleteUserWord(userId: string, wordId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${userId}/words/${wordId}`);
  }

  getUserAggregatedWords(userId: string | undefined, params: AggregatedWordsRequestParams): Observable<IWord[]> {
    return this.http.get<IWord[]>(`${this.apiUrl}/users/${userId}/aggregatedWords`, {
      params: params as HttpParams,
    });
  }

  getUserAggregatedWord(userId: string, wordId: string): Observable<UserWordModel> {
    return this.http.get<UserWordModel>(`${this.apiUrl}/users/${userId}/aggregatedWords/${wordId}`);
  }
}
