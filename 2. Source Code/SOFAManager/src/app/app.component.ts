import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'SOFAManager';
  isLoggedin: boolean = false;

  constructor(private jwtHelper: JwtHelperService,
    private router: Router){}

  ngOnInit(): void {
    let token = localStorage.getItem('jwt');
    if(!token && this.jwtHelper.isTokenExpired(token)){
      this.router.navigate(['/login']);
    }
  }

}
