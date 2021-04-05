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
  totalRecord: number;
  page: 1;
  assetsDonmain = CONST.assets_domain;
  username: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    let token = localStorage.getItem('jwt');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + token)
    const options = {                                                                                                                                                                                 
      headers: new Headers(headers), 
    };

    let url = 'user/getalluser'
    this.apiService.get(url).subscribe(response => {
      console.log(response);
      if((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY){
        this.listUser = response['listUser'];
        this.totalRecord = this.listUser.length;
      }
      else {
        
      }
    }, error => {
      console.log();
    })
  }
  pageChanged(event){
  }
  search(){
    if(this.username == ""){
      this.ngOnInit();
    } else {
      this.listUser = this.listUser.filter(res => {
        return res.userName.toLocaleLowerCase().match(this.username.toLocaleLowerCase())
      })
    }
  }

}
