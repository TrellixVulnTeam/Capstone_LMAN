import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username = '';

  constructor() { }

  ngOnInit(): void {
    // get user info
    this.username = localStorage.getItem('userName')!;
  }

}
