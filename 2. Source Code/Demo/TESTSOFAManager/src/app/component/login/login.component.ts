import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Static } from 'src/app/Common/static';
import { Account } from 'src/app/model/account';
import { LoginService } from 'src/app/service/login.service';
import { ApiService } from '../../service/api-service.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  invalidLogin: boolean = false;


  constructor(private loginService: LoginService,
    private router: Router,
    private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    //get token
    let token = localStorage.getItem('jwt-token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(["/"]);
    }
  }

  login() {

    this.loginService.login(this.username, this.password).subscribe(response => {
      // get data and set to storage
      if ((<any>response).code === Static.LOGIN_SUCCESSFUL_STATUS) {
        localStorage.setItem('jwt-token', (<any>response).token);
        
        let userName = (<any>response).account.firstName + ' ' + (<any>response).account.lastName;
        localStorage.setItem('userName', userName);

        this.invalidLogin = false;
        this.router.navigate(["/"]);
      } else {
        this.invalidLogin = true;
      }
    }, error => {
      console.log((<any>error).code);
      this.invalidLogin = true;
    });
  }

}
