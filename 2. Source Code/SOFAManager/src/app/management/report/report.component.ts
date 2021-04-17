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

  constructor(private apiService: ApiService,
    private dialog: MatDialog,
    private toastr: ToastrService) { }

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

  handlePostReport(reportId, postId){
    const dialogRef = this.dialog.open(MatDialogConfirmComponent, { data: { title: "Xóa post", content: "Bạn muốn xóa post này?" } });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        let formData = new FormData();
        formData.append('reportId', reportId);
        formData.append('postId', postId);
        let url = 'report/handlepostreport';
        this.apiService.post(url, formData).subscribe(response => {
          if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
            this.listPostReport.forEach(post => {
              if(post.id == reportId){
                post.isProcessed = true;
              }
            })
            this.notificationSuccess("Xóa post thành công!");
          }
          else {

          }
        }, error => {
          console.log((<any>error).code);
        })
      }
    });
  }

  handleUserReport(reportId, toAccount){
    const dialogRef = this.dialog.open(MatDialogConfirmComponent, { data: { title: "Ban user", content: "Bạn muốn ban user này?" } });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        let formData = new FormData();
        formData.append('reportId', reportId);
        formData.append('userId', toAccount);
        let url = 'report/handleuserreport';
        this.apiService.post(url, formData).subscribe(response => {
          if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
            this.listUserReport.forEach(user => {
              if(user.id == reportId){
                user.isProcessed = true;
              }
            })
            this.notificationSuccess("Ban thành công!");
          }
          else {

          }
        }, error => {
          console.log((<any>error).code);
        })
      }
    });
  }

  notificationSuccess(notification: string) {
    this.toastr.success(notification, '', {
      timeOut: 2000, positionClass: 'toast-top-center'
    });
  }
}
