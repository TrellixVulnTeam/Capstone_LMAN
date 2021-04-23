import { Component, OnInit } from '@angular/core';
import { Voucher } from 'src/model/voucher';
import { ApiService } from 'src/service/api-service.service';
import * as CONST from '../../../config/config'
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { Post } from 'src/model/post';
import { User } from 'src/model/user';
import { UserBalance } from 'src/model/UserBalance';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfirmComponent } from '../mat-dialog-confirm/mat-dialog-confirm.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {

  keyword: '';
  listVoucher: Array<Voucher> = new Array<Voucher>();
  defaultListVoucher: Array<Voucher> = new Array<Voucher>();
  totalRecord: number;
  page: 1;
  selectOptionList: string[];
  selectedValue: string;

  constructor(private apiService: ApiService,
    private dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.selectOptionList = ['Title', 'Content', 'Code', 'Created by'];
    this.selectedValue = 'Title';

    let url = 'voucher/getallvoucher'
    this.apiService.get(url).subscribe(response => {
      if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
        this.listVoucher = response['listVoucher'];
        this.defaultListVoucher = this.listVoucher;
        this.totalRecord = this.listVoucher.length;
      }
      else {

      }
    }, error => {
      console.log();
    })
  }

  search() {
    this.listVoucher = this.defaultListVoucher;
    if (this.keyword == "") {
      this.listVoucher = this.defaultListVoucher;
    } else {
      switch (this.selectedValue) {
        case 'Title':
          this.listVoucher = this.listVoucher.filter(res => {
            return res.title.toLocaleLowerCase().match(this.keyword.toLocaleLowerCase())
          });
          break;
        case 'Content':
          this.listVoucher = this.listVoucher.filter(res => {
            return res.content.toLocaleLowerCase().match(this.keyword.toLocaleLowerCase())
          });
          break;
        case 'Code':
          this.listVoucher = this.listVoucher.filter(res => {
            return res.code.toLocaleLowerCase().match(this.keyword.toLocaleLowerCase())
          });
          break;
        case 'Created by':
          this.listVoucher = this.listVoucher.filter(res => {
            return res.createdBy.toLocaleLowerCase().match(this.keyword.toLocaleLowerCase())
          });
          break;
        default:
          break;
      }
    }
  }

  truncateChar(text: string): string {
    let charlimit = 100;
    if (!text || text.length <= charlimit) {
      return text;
    }

    let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
    let shortened = without_html.substring(0, charlimit) + "...";
    return shortened;
  }

  deleteVoucher(id) {
    const dialogRef = this.dialog.open(MatDialogConfirmComponent,
      { data: { title: "Delete voucher", content: "Do you want to delete this voucher?" } });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        let formData = new FormData();
        formData.append('voucherId', id);
        let url = 'voucher/DeleteVoucher';
        this.apiService.post(url, formData).subscribe(response => {
          if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
            this.notificationSuccess("Delete voucher successfully");
            this.ngOnInit();
          }
          else {

          }
        }, error => {
          console.log((<any>error).code);
        })
      }
    });
  }

  notificationSuccess(notification: string) {
    this.toastr.success(notification, '', {
      timeOut: 2000, positionClass: 'toast-top-center'
    });
  }

  selectOption(){
    this.search();
  }

}
