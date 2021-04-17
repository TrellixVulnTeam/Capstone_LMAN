import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { Post } from 'src/model/post';
import { User } from 'src/model/user';
import { UserBalance } from 'src/model/UserBalance';
import { ApiService } from 'src/service/api-service.service';
import * as CONST from '../../../config/config'
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfirmComponent } from '../mat-dialog-confirm/mat-dialog-confirm.component';
import { ToastrService } from 'ngx-toastr';
import { Report } from 'src/model/report';
import { UserReport } from 'src/model/userReport';
import { PostReport } from 'src/model/postReport';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  username: '';
  listReport: Array<Report> = new Array<Report>();
  listUserReport: Array<Report> = new Array<Report>();
  listPostReport: Array<Report> = new Array<Report>();
  totalRecordPost: number;
  pagePost: 1;
  totalRecordUser: number;
  pageUser: 1;
  assetsDonmain = CONST.assets_domain;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    let url = 'report/AdminGetAllReport'
    this.apiService.get(url).subscribe(response => {
      if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
        this.listReport = response['listReport'];

        this.listPostReport = this.listReport.filter(res => {
          return res.typeReport.id == 1
        });

        this.listUserReport = this.listReport.filter(res => {
          return res.typeReport.id == 2
        });

        this.totalRecordPost = this.listPostReport.length;
        this.totalRecordUser = this.listUserReport.length;
      }
      else {

      }
    }, error => {
      console.log();
    })
  }

  search() {
    // if(this.username == ""){
    //   this.ngOnInit();
    // } else {
    //   this.listReport = this.listReport.filter(res => {
    //     return res.fromAccountName.toLocaleLowerCase().match(this.username.toLocaleLowerCase())
    //   })
    // }
  }
}
