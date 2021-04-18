import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public baseApiUrl = 'https://guarded-eyrie-57031.herokuapp.com';
  public githubAssetUrl = 'https://raw.githubusercontent.com/rss-maksim/LearnWords/master';

  constructor() {}
}
