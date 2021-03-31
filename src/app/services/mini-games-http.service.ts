import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IWord } from '../core/models/IWord';
import { ApiService } from '../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class MiniGamesHttpService {
  page = 0;
  group = 0;
  constructor(private http: HttpClient, private api: ApiService) {}

  getWords(group: number = 0, page: number = this.getRandomNumber(30)): Observable<IWord[]> {
    this.page = page;
    this.group = group;
    return this.http.get<IWord[]>(`${this.api.baseApiUrl}/words?page=${page}&group=${group}`);
  }

  getWordById(id: string): Observable<IWord> {
    return this.http.get<IWord>(`${this.api.baseApiUrl}/words/${id}`);
  }

  getRandomTranslations() {
    return this.http.get(
      `${this.api.baseApiUrl}/words?page=${this.getRandomNumber(7)}&group=${
        this.group > 4 ? this.group - 1 : this.group + 1
      }&wordsPerExampleSentenceLTE=100&wordsPerPage=80`,
    );
  }

  shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  getValuesArray(array: IWord[]): string[] {
    const tempArr = this.shuffleArray(array);
    return tempArr.map((elem: IWord) => elem.wordTranslate);
  }

  getRandomNumber(pages: number) {
    return Math.floor(Math.random() * pages);
  }
}
