import { Component, OnInit } from '@angular/core';
import { Voucher } from 'src/model/voucher';
import { ApiService } from 'src/service/api-service.service';
import * as CONST from '../../../config/config'

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {

  username: '';
  listVoucher: Array<Voucher> = new Array<Voucher>();
  totalRecord: number;
  page: 1;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    let url = 'voucher/getallvoucher'
    this.apiService.get(url).subscribe(response => {
      console.log(response);
      if((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY){
        this.listVoucher = response['listVoucher'];
        this.totalRecord = this.listVoucher.length;
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
      this.listVoucher = this.listVoucher.filter(res => {
        return res.createdBy.toLocaleLowerCase().match(this.username.toLocaleLowerCase())
      })
    }
  }

  truncateChar(text: string): string {
    let charlimit = 100;
    if(!text || text.length <= charlimit )
    {
        return text;
    }

  let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
  let shortened = without_html.substring(0, charlimit) + "...";
  return shortened;
}

}
