import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from "../../../model/user";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  user: User = new User();
  errorMessage: string;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  login() {
   
  }
}
