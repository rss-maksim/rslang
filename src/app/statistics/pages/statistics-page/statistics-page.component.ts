import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
import { IShortTermStats } from 'src/app/core/models/IShortTermStats';
import { ShortTermStatisticsService } from '../../services/short-term-statistics/short-term-statistics.service';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
})
export class StatisticsPageComponent implements OnInit {
  isAuthorized = false;
  isShortTermStatisticsAvailable = false;
  today = new Date(Date.now()).toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  shortTermStats: IShortTermStats[] | null = null;

  constructor(private authService: AuthService, private shortTermStatisticsService: ShortTermStatisticsService) {}

  ngOnInit(): void {
    this.isAuthorized = this.authService.isAuthorized;

    this.shortTermStats = this.shortTermStatisticsService.getStatistics();
    if (this.shortTermStats) {
      this.isShortTermStatisticsAvailable = true;
    }
  }
}
