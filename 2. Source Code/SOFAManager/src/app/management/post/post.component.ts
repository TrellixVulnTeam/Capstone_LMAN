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

  keyword: '';
  listPost: Array<Post> = new Array<Post>();
  defaultListPost: Array<Post> = new Array<Post>();
  totalRecord: number;
  page: 1;
  assetsDonmain = CONST.assets_domain;
  selectOptionList: string[];
  selectedValue: string;


  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.selectOptionList = ['Posted by', 'Content'];
    this.selectedValue = 'Posted by';

    let url = 'post/GetAllPostWithoutPaging'
    this.apiService.get(url).subscribe(response => {
      console.log(response);
      if((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY){
        this.listPost = response['listPost'];
        this.defaultListPost = this.listPost;
        this.totalRecord = this.listPost.length;
      }
      else {
        
      }
    }, error => {
      console.log();
    })
  }

  search() {
    this.listPost = this.defaultListPost;
    if (this.keyword == "") {
      this.listPost = this.defaultListPost;
    } else {
      switch (this.selectedValue) {
        case 'Posted by':
          this.listPost = this.listPost.filter(res => {
            return res.postedBy.toLocaleLowerCase().match(this.keyword.toLocaleLowerCase())
          });
          break;
        case 'Content':
          this.listPost = this.listPost.filter(res => {
            return res.content.toLocaleLowerCase().match(this.keyword.toLocaleLowerCase())
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
