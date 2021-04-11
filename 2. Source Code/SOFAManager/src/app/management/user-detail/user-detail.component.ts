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
  totalRecord: number;
  page: 1;

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

    forkJoin([userDetail, userBalance, userPost]).subscribe(results => {
      this.userDetail = <any>results[0];
      this.userBalance = <any>results[1];
      this.totalRecord = this.userBalance.listBalance.length;
      this.userPost = <any>results[2]["listPost"];
    });
  }

  onClickBan(id) {
    const dialogRef = this.dialog.open(MatDialogConfirmComponent, { data: { title: "Ban người dùng", content: "Bạn muốn ban người dùng này?" } });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        let formData = new FormData();
        formData.append('accountId', id);
        let url = 'user/BanUser';
        this.apiService.post(url, formData).subscribe(response => {
          if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
            this.userDetail.isActive = <any>response["isActive"];
            this.notificationSuccess("Ban người dùng thành công");
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
    const dialogRef = this.dialog.open(MatDialogConfirmComponent, { data: { title: "Unban người dùng", content: "Bạn muốn unban người dùng này?" } });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        let formData = new FormData();
        formData.append('accountId', id);
        let url = 'user/UnbanUser';
        this.apiService.post(url, formData).subscribe(response => {
          if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
            this.userDetail.isActive = <any>response["isActive"];
            this.notificationSuccess("Unban người dùng thành công");
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
      { data: { title: "Đặt lại mật khẩu", content: "Bạn muốn đặt lại mật khẩu cho người dùng này?" } });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        let formData = new FormData();
        formData.append('accountId', id);
        let url = 'auth/admin-reset-password';
        this.apiService.post(url, formData).subscribe(response => {
          if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
            this.notificationSuccess("Reset password thành công!");
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
      { width: '300px', data: { title: "Thêm balance", isGetInput: true } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let formData = new FormData();
        formData.append('accountId', id);
        formData.append('adminId', this.adminId);
        formData.append('amount', result);
        let url = 'balance/topUpAccount';
        this.apiService.post(url, formData).subscribe(response => {
          if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
            this.notificationSuccess("Thêm balance thành công!");
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


  notificationSuccess(notification: string) {
    this.toastr.success(notification, '', {
      timeOut: 2000, positionClass: 'toast-top-center'
    });
  }
}
