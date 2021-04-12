import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { ApiService } from 'src/service/api-service.service';
import * as CONST from '../../../config/config'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  listUser: Array<User> = new Array<User>();
  defaultListUser: Array<User> = new Array<User>();
  totalRecord: number;
  page: 1;
  assetsDonmain = CONST.assets_domain;
  keyword: string = '';
  selectOptionList: string[];
  selectedValue: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.selectOptionList = ['Username', 'Email', 'Fullname', 'Phone'];
    this.selectedValue = 'Username';

    let token = localStorage.getItem('jwt');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + token)
    const options = {
      headers: new Headers(headers),
    };

    let url = 'user/getalluser'
    this.apiService.get(url).subscribe(response => {
      if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
        this.listUser = response['listUser'];
        this.defaultListUser = this.listUser;
        this.totalRecord = this.listUser.length;
      }
      else {

      }
    }, error => {
      console.log();
    })
  }
  pageChanged(event) {
  }
  search() {
    this.listUser = this.defaultListUser;
    if (this.keyword == "") {
      this.listUser = this.defaultListUser;
    } else {
      switch (this.selectedValue) {
        case 'Username':
          this.listUser = this.listUser.filter(res => {
            return res.userName.toLocaleLowerCase().match(this.keyword.toLocaleLowerCase())
          });
          break;
        case 'Email':
          this.listUser = this.listUser.filter(res => {
            return res.email.toLocaleLowerCase().match(this.keyword.toLocaleLowerCase())
          });
          break;
        case 'Fullname':
          this.listUser = this.listUser.filter(res => {
            return res.firstName.toLocaleLowerCase().match(this.keyword.toLocaleLowerCase())
          });
          break;
        case 'Phone':
          this.listUser = this.listUser.filter(res => {
            return res.phone.toLocaleLowerCase().match(this.keyword.toLocaleLowerCase())
          });
          break;
        default:
          break;
      }
    }
  }
  selectOption(){
    this.search();
  }

}
