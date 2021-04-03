import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { ILongTermStats } from '../models/ILongTermStats';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  apiUrl: string;

  constructor(private http: HttpClient, private api: ApiService) {
    this.apiUrl = api.baseApiUrl;
  }

  getUserStatistics(userId: string): Observable<ILongTermStats> {
    return this.http.get<ILongTermStats>(`${this.apiUrl}/users/${userId}/statistics`);
  }

  updateUserStatistics(userId: string, body: ILongTermStats): Observable<ILongTermStats> {
    return this.http.put<ILongTermStats>(`${this.apiUrl}/users/${userId}/statistics`, body);
  }
}
