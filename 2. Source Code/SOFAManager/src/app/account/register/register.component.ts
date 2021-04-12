import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/service/api-service.service';
import { User } from "../../../model/user";
import * as CONST from '../../../config/config'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = '';
  password: string = '';
  firstname: string = '';
  lastname: string = '';
  rePassword: string = '';
  errorMessage: string;
  invalidLogin: boolean = false;
  constructor(public router: Router,
    private toastr: ToastrService,
    private apiService: ApiService) { }

  ngOnInit() {
  }

  register() {
    if (this.username == '' || this.password == '' || this.rePassword == '' || this.firstname == '' || this.lastname == '') {
      this.invalidLogin = true;
      this.errorMessage = 'Vui lòng điền đầy đủ thông tin'
    } else if (this.password != this.rePassword) {
      this.invalidLogin = true;
      this.errorMessage = 'Mật khẩu xác nhận không đúng'
    }
    else if (this.password.length < 6 || this.rePassword.length < 6) {
      this.invalidLogin = true;
      this.errorMessage = 'Mật khẩu gồm 6 ký tự trở lên'
    } else {
      let formData = new FormData();
      formData.append('username', this.username);
      formData.append('password', this.password);
      formData.append('firstname', this.firstname);
      formData.append('lastname', this.lastname);
      let url = 'auth/addNewStaff';
      this.apiService.post(url, formData).subscribe(response => {
        console.log(response);
        if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
          this.notificationSuccess('Tạo tài khoản thành công!');
          this.username = '';
          this.password = '';
          this.firstname = '';
          this.lastname = '';
          this.rePassword = '';
        }
        else {
          this.invalidLogin = true;
          this.errorMessage = 'Vui lòng kiểm tra lại thông tin'
        }
      }, error => {
        this.invalidLogin = true;
        console.log((<any>error).code);
      })
    }
  }

  notificationSuccess(notification: string) {
    this.toastr.success(notification, '', {
      timeOut: 2000, positionClass: 'toast-top-center'
    });
  }

  notificationError(notifi: string) {
    this.toastr.error(notifi, 'Thông báo');
  }
}
