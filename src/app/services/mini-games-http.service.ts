import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiService } from '../core/services/api.service';
import { IWord } from '../redux/actions/audiochallenge.actions';

@Injectable({
  providedIn: 'root',
})
export class MiniGamesHttpService {
  page = 0;
  group = 0;
  constructor(private http: HttpClient, private api: ApiService) {}

  getWords(page = this.getRandomNumber(30), group = 0) {
    this.page = page;
    this.group = group;
    return this.http.get(`${this.api.baseApiUrl}/words?page=${page}&group=${group}`);
  }

  getWordById(id: string) {
    console.log(id);
    return this.http.get(`${this.api.baseApiUrl}/words/${id}`);
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
