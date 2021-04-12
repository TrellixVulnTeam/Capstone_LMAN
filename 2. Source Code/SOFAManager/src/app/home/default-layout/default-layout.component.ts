import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/model/user';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

  isLoggedin: boolean = false
  user: User = new User();
  constructor(private jwtHelper: JwtHelperService,
    private router: Router) { }

  ngOnInit() {
    // get token
    let userStored = JSON.parse(localStorage.getItem('user'));
    this.user.firstName = userStored.firstName
    this.user.lastName = userStored.lastName
    this.user.roleName = userStored.roleName
    this.router.navigate(['/dashboard']);
  }

  
  logOut(){
    localStorage.removeItem('jwt');
    localStorage.removeItem('user')
    this.router.navigate(['/login']);
  }

}
