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
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { VoucherPickerDialogComponent } from 'src/app/voucher-picker-dialog/voucher-picker-dialog.component';
import { Voucher } from 'src/model/voucher';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  adminId = '';
  accountId = 0;
  userDetail: User = new User();
  userBalance: UserBalance = new UserBalance();
  userPost: Array<Post> = new Array<Post>();
  assetsDonmain = CONST.assets_domain;
  totalRecordBalance: number;
  pageBalance: 1;
  totalRecordPost: number;
  pagePost: 1;
  faCheckCircle = faCheckCircle;
  listVoucher: Array<Voucher> = new Array<Voucher>();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit() {
    let admin = JSON.parse(localStorage.getItem('user'));
    this.adminId = admin["id"];

    this.accountId = +this.route.snapshot.paramMap.get('id');
    const userDetail = this.apiService.get('user/GetUserDetailByID?id=' + this.accountId);
    const userBalance = this.apiService.get('balance/GetUserBalanceById?id=' + this.accountId);
    const userPost = this.apiService.get('post/GetPostByUserWithoutPaging?id=' + this.accountId);
    const listVoucher = this.apiService.get('voucher/getallvoucher');

    forkJoin([userDetail, userBalance, userPost, listVoucher]).subscribe(results => {
      this.userDetail = <any>results[0];
      this.userBalance = <any>results[1];
      this.totalRecordBalance = this.userBalance.listBalance.length;
      this.userPost = <any>results[2]["listPost"];
      this.totalRecordPost = this.userPost.length;
      this.listVoucher = <any>results[3]["listVoucher"];
    });
  }

  onClickBan(id) {
    const dialogRef = this.dialog.open(MatDialogConfirmComponent, { data: { title: "Ban user", content: "Do you want to ban this user?" } });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        let formData = new FormData();
        formData.append('accountId', id);
        let url = 'user/BanUser';
        this.apiService.post(url, formData).subscribe(response => {
          if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
            this.userDetail.isActive = <any>response["isActive"];
            this.notificationSuccess("Ban user successfully");
          }
          else {

          }
        }, error => {
          console.log((<any>error).code);
        })
      }
    });
  }

  onClickUnban(id) {
    const dialogRef = this.dialog.open(MatDialogConfirmComponent, { data: { title: "Unban user", content: "Do you want to unban this user?" } });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        let formData = new FormData();
        formData.append('accountId', id);
        let url = 'user/UnbanUser';
        this.apiService.post(url, formData).subscribe(response => {
          if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
            this.userDetail.isActive = <any>response["isActive"];
            this.notificationSuccess("Unban user successfully");
          }
          else {

          }
        }, error => {
          console.log((<any>error).code);
        })
      }
    });
  }

  onClickResetPassword(id) {
    const dialogRef = this.dialog.open(MatDialogConfirmComponent,
      { data: { title: "Reset password", content: "Do you want to reset password for this user?" } });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        let formData = new FormData();
        formData.append('accountId', id);
        let url = 'auth/admin-reset-password';
        this.apiService.post(url, formData).subscribe(response => {
          if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
            this.notificationSuccess("Reset password successfully");
          }
          else {

          }
        }, error => {
          console.log((<any>error).code);
        })
      }
    });
  }

  onClickAddBalance(id) {
    const dialogRef = this.dialog.open(MatDialogConfirmComponent,
      { width: '300px', data: { title: "Add balance", isGetInput: true } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let formData = new FormData();
        formData.append('accountId', id);
        formData.append('adminId', this.adminId);
        formData.append('amount', result);
        let url = 'balance/topUpAccount';
        this.apiService.post(url, formData).subscribe(response => {
          if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
            this.notificationSuccess("Add balance successfully");
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

  
  onClickAddVoucher(){
    const dialogRef = this.dialog.open(VoucherPickerDialogComponent,
      { width: '600px', height: '500px', data: this.listVoucher});

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          let formData = new FormData();
          formData.append('voucherId', result);
          formData.append('accountId', this.accountId.toString());
          let url = 'voucher/GiveVoucher';
          this.apiService.post(url, formData).subscribe(response => {
            if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
              this.notificationSuccess("Give voucher successfully");
              this.ngOnInit();
            }
            else {
              this.notificationFail("Give voucher Failed");
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
  notificationFail(notification: string) {
    this.toastr.error(notification, '', {
      timeOut: 2000, positionClass: 'toast-top-center'
    });
  }
}
