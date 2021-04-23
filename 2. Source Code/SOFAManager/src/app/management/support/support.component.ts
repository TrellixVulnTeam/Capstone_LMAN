import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { UserSupport } from 'src/model/userSupport';
import { ApiService } from 'src/service/api-service.service';
import * as CONST from '../../../config/config';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfirmComponent } from '../mat-dialog-confirm/mat-dialog-confirm.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  listSupport: Array<UserSupport> = new Array<UserSupport>();
  defaultlistSupport: Array<UserSupport> = new Array<UserSupport>();
  totalRecord: number;
  page: 1;
  assetsDonmain = CONST.assets_domain;
  keyword: string = '';
  selectOptionList: string[];
  selectedValue: string;

  constructor( private apiService: ApiService,
    private dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.selectOptionList = ['Username', 'Email', 'Fullname', 'Phone'];
    this.selectedValue = 'Username';

    let url = 'support/getdetailusersupport'
    this.apiService.get(url).subscribe(response => {
      if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
        this.listSupport = response['listUserSupport'];
        this.defaultlistSupport = this.listSupport;
        this.totalRecord = this.listSupport.length;
      }
      else {

      }
    }, error => {
      console.log();
    })
  }

  search() {
    this.listSupport = this.defaultlistSupport;
    if (this.keyword == "") {
      this.listSupport = this.defaultlistSupport;
    } else {
      switch (this.selectedValue) {
        case 'Username':
          this.listSupport = this.listSupport.filter(res => {
            return res.username.toLocaleLowerCase().match(this.keyword.toLocaleLowerCase())
          });
          break;
        case 'Email':
          this.listSupport = this.listSupport.filter(res => {
            return res.email.toLocaleLowerCase().match(this.keyword.toLocaleLowerCase())
          });
          break;
        case 'Fullname':
          this.listSupport = this.listSupport.filter(res => {
            return res.firstname.toLocaleLowerCase().match(this.keyword.toLocaleLowerCase())
          });
          break;
        case 'Phone':
          this.listSupport = this.listSupport.filter(res => {
            return res.phone.toLocaleLowerCase().match(this.keyword.toLocaleLowerCase())
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

  approveRequest(requestId, userId, requestType){
    let contentConfirm = '';
    let url = '';
    if(requestType == 1){
      contentConfirm = 'Do you wan to set this account to become a Fashionista?';
      url = 'support/setuserfashionista';
    }
    else {
      contentConfirm = 'Do you want to ban this account?'
      url = 'support/setuserlockaccount';
    }
    const dialogRef = this.dialog.open(MatDialogConfirmComponent, { data: { title: "Confirm", content: contentConfirm } });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        let formData = new FormData();
        formData.append('requestId', requestId);
        formData.append('userId', userId);
        this.apiService.post(url, formData).subscribe(response => {
          if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
            this.listSupport.forEach(user => {
              if(user.requestId == requestId){
                user.status = 1;
              }
            })
            this.notificationSuccess("Approve successfully");
          }
          else {

          }
        }, error => {
          console.log((<any>error).code);
        })
      }
    });
  }

  rejectRequest(requestId, requestType, userId){
    const dialogRef = this.dialog.open(MatDialogConfirmComponent, { data: { title: "Confirm", content: "Do you want to reject this request?" } });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        let url = 'support/rejectsupportrequest'
        let formData = new FormData();
        formData.append('requestId', requestId);
        formData.append('requestType', requestType);
        formData.append('userId', userId);
        this.apiService.post(url, formData).subscribe(response => {
          if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
            this.listSupport.forEach(user => {
              if(user.requestId == requestId){
                user.status = 3;
              }
            })
            this.notificationSuccess("Reject successfully!");
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
