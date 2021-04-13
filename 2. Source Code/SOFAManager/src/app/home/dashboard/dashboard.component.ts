import { Component, OnInit } from '@angular/core';
import {ChartOptions, ChartType} from "chart.js";
import {Label, MultiDataSet, SingleDataSet} from "ng2-charts";
import { Dashboard } from 'src/model/dashboard';
import { ApiService } from 'src/service/api-service.service';
import * as CONST from '../../../config/config'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  //user
  doughnutChartLabels: Label[] = ['Active', 'Inactive'];
  doughnutChartData: MultiDataSet = [[99, 1]];
  doughnutChartType: ChartType = 'doughnut';
  //post
  pieChartOptions: ChartOptions = {
    responsive: true,
  };
  pieChartLabels: Label[] = ['Verified', 'Not Verified'];
  pieChartData: SingleDataSet = [126,34];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [];

  dashboardInfo: Dashboard = new Dashboard();

  constructor( private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get('user/GetDashboard').subscribe(response => {
      if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
        this.dashboardInfo = <any>response;

        this.doughnutChartData = [[this.dashboardInfo.numberOfUserActive, this.dashboardInfo.totalUser - this.dashboardInfo.numberOfUserActive]]
        this.pieChartData = [this.dashboardInfo.numberOfPostVerified, this.dashboardInfo.totalPost - this.dashboardInfo.numberOfPostVerified]
      }
      else {
      }
    }, error => {
      console.log((<any>error).code);
    })
  }

}
