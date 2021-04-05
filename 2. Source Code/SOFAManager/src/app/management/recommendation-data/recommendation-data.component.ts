import { Component, OnInit } from '@angular/core';
import { Recommendation } from 'src/model/recommendation';
import { ApiService } from 'src/service/api-service.service';
import * as CONST from '../../../config/config'

@Component({
  selector: 'app-recommendation-data',
  templateUrl: './recommendation-data.component.html',
  styleUrls: ['./recommendation-data.component.scss']
})
export class RecommendationDataComponent implements OnInit {

  username: '';
  listRecommendation: Array<Recommendation> = new Array<Recommendation>();
  totalRecord: number;
  page: 1;
  assetsDonmain = CONST.assets_domain;

  constructor() { }

  ngOnInit() {
  }

  search(){
    if(this.username == ""){
      this.ngOnInit();
    } else {
      this.listRecommendation = this.listRecommendation.filter(res => {
        return res.postedBy.toLocaleLowerCase().match(this.username.toLocaleLowerCase())
      })
    }
  }
}
