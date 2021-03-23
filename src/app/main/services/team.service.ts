import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from '../../shared/services/api.service';
import { Teammate } from '../../redux/models/teammate.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private http: HttpClient, private api: ApiService) {}

  getAll(): Observable<Object> {
    return this.http.get(`${this.api.baseApiUrl}/team`);
  }
}
