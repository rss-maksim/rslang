import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IWord } from '../core/models/IWord';
import { ApiService } from '../core/services/api.service';
import { WordsService } from 'src/app/core/services/words.service';
import { UserService } from '../core/services/user.service';
import { AggregatedWordsRequestParams, UserWordModel } from '../core/models/word.model';

@Injectable({
  providedIn: 'root',
})
export class MiniGamesHttpService {
  page = 0;
  group = 0;

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private wordsService: WordsService,
    private userService: UserService,
  ) {}
  // this.getRandomNumber(30);
  getWords({ userId, page, group, filter }: AggregatedWordsRequestParams): Observable<IWord[]> {
    page ? page : (page = this.getRandomNumber(30).toString());
    group ? group : '0';
    console.log(group, page);
    if (userId) {
      return this.wordsService.getUserAggregatedWords(userId, { page, group, filter });
    }
    return this.wordsService.getAll({ group, page });
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
