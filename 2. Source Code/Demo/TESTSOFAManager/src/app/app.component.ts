import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'SOFAManager';
  loggedIn: boolean = false;

  constructor(private jwtHelper: JwtHelperService){}

  ngOnInit(): void {
    // get token
    let token = localStorage.getItem('jwt-token');
    if(token && !this.jwtHelper.isTokenExpired(token)){
      this.loggedIn = true;
    }
  }

}
