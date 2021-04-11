import { Component, OnInit } from '@angular/core';
import {Label, MultiDataSet} from "ng2-charts";
import {ChartType} from "chart.js";

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit {

  doughnutChartLabels: Label[] = ['Active', 'Inactive'];
  doughnutChartData: MultiDataSet = [
    [99, 1]
  ];
  doughnutChartType: ChartType = 'doughnut';


  constructor() { }

  ngOnInit() {
  }

}
