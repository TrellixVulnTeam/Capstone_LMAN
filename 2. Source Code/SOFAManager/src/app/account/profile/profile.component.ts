import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/service/api-service.service';
import { User } from "../../../model/user";
import * as CONST from '../../../config/config'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = new User();
  isChangePassword = false;
  oldPassword: '';
  newPassword: '';
  cfNewPassword: '';
  invalid = false;
  errorMessage = '';
  constructor(public router: Router,
    private toastr: ToastrService,
    private apiService: ApiService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
  }

  changePassword() {
    this.isChangePassword = true;
  }

  onClickCancel() {
    this.oldPassword = '';
    this.newPassword = '';
    this.cfNewPassword = '';
    this.invalid = false;
    this.isChangePassword = false;
  }
  onClickChange() {
    if (this.newPassword != this.cfNewPassword) {
      this.invalid = true;
      this.errorMessage = "Incorrect confirm new password";
    }else if (this.cfNewPassword.length < 6 || this.newPassword.length < 6) {
      this.invalid = true;
      this.errorMessage = 'Password must contain at least 6 characters'
    } else {
      let formData = new FormData();
      formData.append('username', this.user.userName);
      formData.append('password', this.oldPassword);
      formData.append('newPassword', this.newPassword);
      let url = 'auth/admin-change-password';
      this.apiService.post(url, formData).subscribe(response => {
        if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
          this.notificationSuccess('Change password successfully');
          localStorage.removeItem('jwt');
          localStorage.removeItem('user')
          this.router.navigate(['/login']);
        }
        else {
          this.invalid = true;
          this.errorMessage = 'Incorrect current password'
        }
      }, error => {
        this.invalid = true;
        console.log((<any>error).code);
      })
    }
  }

  notificationSuccess(notification: string) {
    this.toastr.success(notification, '', {
      timeOut: 2000, positionClass: 'toast-top-center'
    });
  }
}
