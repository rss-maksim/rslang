import { Component, OnInit } from '@angular/core';

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
import { FakeStatisticsService } from 'src/app/statistics/services/fake-statistics/fake-statistics.service';

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
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: Y_AXES_1_GRID_LINES_COLOR,
          },
          ticks: {
            fontColor: Y_AXES_1_TICKS_COLOR,
          },
        },
      ],
    },
  };
  lineChartColors: Color[] = [LINE_CHART_COLORS_1, LINE_CHART_COLORS_2];
  lineChartLegend = true;
  lineChartType: ChartType = 'line';

  constructor(private fakeStats: FakeStatisticsService) {}

  ngOnInit(): void {
    const NUMBER_OF_FAKE_TRAININGS = 20;
    [this.labels, this.learnedWords, this.learnedWordsCumulative] = this.fakeStats.generateLongTermStats(
      NUMBER_OF_FAKE_TRAININGS,
    );

    this.lineChartData = [
      { data: this.learnedWords, label: CHART_LABEL_1 },
      { data: this.learnedWordsCumulative, label: CHART_LABEL_2, yAxisID: 'y-axis-1' },
    ];
    this.lineChartLabels = this.labels;
  }
}
