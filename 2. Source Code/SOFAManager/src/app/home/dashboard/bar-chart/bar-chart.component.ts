import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Label} from "ng2-charts";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: Label[] = ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70], label: 'Bàn ghế phòng khách' },
    { data: [80, 99, 69, 27], label: 'Bàn ghế phòng ăn' },
    { data: [45, 37, 60, 70], label: 'Tủ quần áo' },
    { data: [45, 37, 60, 70], label: 'Kệ ti vi' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
