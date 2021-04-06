import { Component, OnInit } from '@angular/core';
import { Post } from 'src/model/post';
import { ApiService } from 'src/service/api-service.service';
import * as CONST from '../../../config/config'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  username: '';
  listPost: Array<Post> = new Array<Post>();
  totalRecord: number;
  page: 1;
  assetsDonmain = CONST.assets_domain;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    let url = 'post/GetAllPostWithoutPaging'
    this.apiService.get(url).subscribe(response => {
      console.log(response);
      if((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY){
        this.listPost = response['listPost'];
        this.totalRecord = this.listPost.length;
      }
      else {
        
      }
    }, error => {
      console.log();
    })
  }

  search(){
    if(this.username == ""){
      this.ngOnInit();
    } else {
      this.listPost = this.listPost.filter(res => {
        return res.postedBy.toLocaleLowerCase().match(this.username.toLocaleLowerCase())
      })
    }
  }

}
