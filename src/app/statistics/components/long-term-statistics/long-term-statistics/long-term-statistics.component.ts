import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import {
  CHART_LABEL_1,
  CHART_LABEL_2,
  LINE_CHART_COLORS_1,
  LINE_CHART_COLORS_2,
  Y_AXES_1_GRID_LINES_COLOR,
  Y_AXES_1_TICKS_COLOR,
} from 'src/app/core/constants/statistics';
import { LongTermStatisticsService } from 'src/app/statistics/services/long-term-statistics/long-term-statistics.service';
import { Training } from 'src/app/core/models/ILongTermStats';

@Component({
  selector: 'app-long-term-statistics',
  templateUrl: './long-term-statistics.component.html',
  styleUrls: ['./long-term-statistics.component.scss'],
})
export class LongTermStatisticsComponent implements OnInit {
  learnedWords: number[] = [];
  learnedWordsCumulative: number[] = [];
  labels: Label[] = [];
  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];
  lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          offset: true,
        },
      ],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            precision: 0,
          },
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: Y_AXES_1_GRID_LINES_COLOR,
          },
          ticks: {
            fontColor: Y_AXES_1_TICKS_COLOR,
            precision: 0,
          },
        },
      ],
    },
  };
  lineChartColors: Color[] = [LINE_CHART_COLORS_1, LINE_CHART_COLORS_2];
  lineChartLegend = true;
  lineChartType: ChartType = 'line';
  hasStatistics = false;
  isLoading = true;
  isError = false;
  errorMessage = '';

  constructor(private longTermStatistics: LongTermStatisticsService) {}

  ngOnInit(): void {
    const userStatistics$ = this.longTermStatistics.getStatistics();

    if (userStatistics$) {
      const userStatisticsSubscription: Subscription = userStatistics$.subscribe(
        (userStatistics) => {
          this.isLoading = false;

          if (!userStatistics.optional?.statistics) {
            return;
          }

          this.hasStatistics = true;
          [this.labels, this.learnedWords, this.learnedWordsCumulative] = this.generateStatisticsByDays(
            userStatistics.optional.statistics.trainings,
          );
          this.lineChartData = [
            { data: this.learnedWords, label: CHART_LABEL_1 },
            { data: this.learnedWordsCumulative, label: CHART_LABEL_2, yAxisID: 'y-axis-1' },
          ];
          this.lineChartLabels = this.labels;
          userStatisticsSubscription.unsubscribe();
        },
        (error) => {
          this.isLoading = false;
          this.isError = true;
          this.errorMessage = error.message;
        },
      );
    }
  }

  private generateStatisticsByDays(trainings: Training[]): [Label[], number[], number[]] {
    const resultStatistics: { [key: string]: number } = {};
    let learnedWords = 0;
    let learnedWordsByIds = new Set();

    trainings.forEach((training) => {
      const date = new Date(training.timeStamp);
      const dateKey = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toLocaleString('ru', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      });
      learnedWords = learnedWordsByIds.size;
      learnedWordsByIds = new Set([...learnedWordsByIds, ...training.wordsIds]);
      const learnedWordsInTraining = learnedWordsByIds.size - learnedWords;

      resultStatistics[dateKey] = (resultStatistics[dateKey] || 0) + learnedWordsInTraining;
    });

    const labels = Object.keys(resultStatistics);
    const words = Object.values(resultStatistics);
    const cumulativeSum = ((sum: number) => {
      return (value: number) => {
        return (sum += value);
      };
    })(0);
    const cummulativeWords = words.map(cumulativeSum);

    return [labels, words, cummulativeWords];
  }
}
