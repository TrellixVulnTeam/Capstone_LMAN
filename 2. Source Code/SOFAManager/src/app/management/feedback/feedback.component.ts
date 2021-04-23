import { ApiService } from 'src/service/api-service.service';
import * as CONST from '../../../config/config'
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { Post } from 'src/model/post';
import { User } from 'src/model/user';
import { UserBalance } from 'src/model/UserBalance';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfirmComponent } from '../mat-dialog-confirm/mat-dialog-confirm.component';
import { ToastrService } from 'ngx-toastr';import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/model/feedback';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  keyword: '';
  totalRecord: number;
  page: 1;
  selectOptionList: string[];
  selectedValue: string;
  listFeedback: Array<Feedback> = new Array<Feedback>();
  defaultListFeedback: Array<Feedback> = new Array<Feedback>();
  isProcessed = false;

  constructor(private apiService: ApiService,
    private dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.selectOptionList = ['Send by', 'Title', 'Content'];
    this.selectedValue = 'Send by';

    let url = 'feedback/getAllFeedback'
    this.apiService.get(url).subscribe(response => {
      if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
        this.listFeedback = response['listFeedback'];
        this.defaultListFeedback = this.listFeedback;
        this.totalRecord = this.listFeedback.length;
      }
      else {

      }
    }, error => {
      console.log();
    })
  }

  notificationSuccess(notification: string) {
    this.toastr.success(notification, '', {
      timeOut: 2000, positionClass: 'toast-top-center'
    });
  }

  truncateChar(text: string): string {
    let charlimit = 100;
    if (!text || text.length <= charlimit) {
      return text;
    }

    let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
    let shortened = without_html.substring(0, charlimit) + "...";
    return shortened;
  }

  acceptFeedback(feedbackId, userFeedbackId){
    const dialogRef = this.dialog.open(MatDialogConfirmComponent,
      { data: { title: "Confirm", content: "Read this feedback and send notification for user?" } });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        let formData = new FormData();
        formData.append('id', feedbackId);
        formData.append('userFeedbackId', userFeedbackId);
        let url = 'feedback/adminProcessFeedback';
        this.apiService.post(url, formData).subscribe(response => {
          if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
            this.notificationSuccess("Confirmed feedback");
            this.keyword = '';
            this.ngOnInit();
          }
          else {

          }
        }, error => {
          console.log((<any>error).code);
        })
      }
    });
  }

  search() {
    this.listFeedback= this.defaultListFeedback;
    if (this.keyword == "") {
      this.listFeedback = this.defaultListFeedback;
    } else {
      switch (this.selectedValue) {
        case 'Title':
          this.listFeedback = this.listFeedback.filter(res => {
            return res.title.toLocaleLowerCase().match(this.keyword.toLocaleLowerCase())
          });
          break;
        case 'Content':
          this.listFeedback = this.listFeedback.filter(res => {
            return res.content.toLocaleLowerCase().match(this.keyword.toLocaleLowerCase())
          });
          break;
        case 'Send by':
          this.listFeedback = this.listFeedback.filter(res => {
            return res.username.toLocaleLowerCase().match(this.keyword.toLocaleLowerCase())
          });
          break;
        default:
          break;
      }
    }
  }

  selectOption(){
    this.search();
  }

}
