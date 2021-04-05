import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/service/api-service.service';
import * as CONST from '../../../config/config'
import { Report } from 'src/model/report';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  username: '';
  listReport: Array<Report> = new Array<Report>();
  totalRecord: number;
  page: 1;
  assetsDonmain = CONST.assets_domain;

  constructor() { }

  ngOnInit() {
    // get report penđing
  }

  search(){
    if(this.username == ""){
      this.ngOnInit();
    } else {
      this.listReport = this.listReport.filter(res => {
        return res.reportBy.toLocaleLowerCase().match(this.username.toLocaleLowerCase())
      })
    }
  }
}
