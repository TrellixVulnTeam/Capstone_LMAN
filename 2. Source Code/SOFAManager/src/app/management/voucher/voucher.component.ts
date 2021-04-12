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

  username: '';
  listVoucher: Array<Voucher> = new Array<Voucher>();
  totalRecord: number;
  page: 1;

  constructor(private apiService: ApiService,
    private dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit() {
    let url = 'voucher/getallvoucher'
    this.apiService.get(url).subscribe(response => {
      console.log(response);
      if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
        this.listVoucher = response['listVoucher'];
        this.totalRecord = this.listVoucher.length;
      }
      else {

      }
    }, error => {
      console.log();
    })
  }

  search() {
    if (this.username == "") {
      this.ngOnInit();
    } else {
      this.listVoucher = this.listVoucher.filter(res => {
        return res.createdBy.toLocaleLowerCase().match(this.username.toLocaleLowerCase())
      })
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
      { data: { title: "Xóa voucher", content: "Bạn muốn xóa voucher này?" } });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        let formData = new FormData();
        formData.append('voucherId', id);
        let url = 'voucher/DeleteVoucher';
        this.apiService.post(url, formData).subscribe(response => {
          if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
            this.notificationSuccess("Xóa voucher thành công!");
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

}
