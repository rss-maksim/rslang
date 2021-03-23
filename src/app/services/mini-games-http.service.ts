import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURL } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class MiniGamesHttpService {
  constructor(private http: HttpClient) {}

  getWords() {
    return this.http.get(`${APIURL}/words`);
  }

  getWordById(id: string) {
    console.log(id);
    return this.http.get(`${APIURL}/words/${id}`);
  }
}
