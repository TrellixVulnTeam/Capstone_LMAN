import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { ApiService } from 'src/service/api-service.service';
import {User} from "../../../model/user";
import * as CONST from '../../../config/config'
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  errorMessage: string;
  invalidLogin: boolean = false;
  user: User = new User();
  constructor(private router: Router,
              private toastr: ToastrService,
              private apiService: ApiService,
              private jwtHelper: JwtHelperService) { }

  ngOnInit() {
    
  }

  login() {
    if(this.username == '' || this.password == ''){
      this.invalidLogin = true;
      this.errorMessage = 'Username and password can not be empty'
    } else {
      let formData = new FormData();
      formData.append('username', this.username);
      formData.append('password', this.password);
      let url = 'auth/login';
      this.apiService.post(url, formData).subscribe(response => {
        if((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY){
          localStorage.setItem('jwt', (<any>response).token);

          this.user.id = (<any>response).id;
          this.user.userName = (<any>response).username;
          this.user.firstName = (<any>response).firstname;
          this.user.lastName = (<any>response).lastname;
          this.user.roleName = (<any>response).roleName;
          this.user.email = (<any>response).email;
          this.user.phone = (<any>response).phone;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.invalidLogin = false;
          this.router.navigate(['/dashboard']);
        }
        else {
          this.invalidLogin = true;
          this.errorMessage = 'Incorrect username or password'
        }
      }, error => {
        this.invalidLogin = true;
        console.log((<any>error).code);
      })
    }
  }


  notificationSuccess(notification: string) {
    this.toastr.success(notification, '', {
      timeOut: 1000, positionClass: 'toast-top-center'
    });
  }
}
