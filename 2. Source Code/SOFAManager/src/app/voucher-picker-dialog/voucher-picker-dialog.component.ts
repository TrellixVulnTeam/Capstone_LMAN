import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Voucher } from 'src/model/voucher';
import * as CONST from '../../config/config'

@Component({
  selector: 'app-voucher-picker-dialog',
  templateUrl: './voucher-picker-dialog.component.html',
  styleUrls: ['./voucher-picker-dialog.component.scss']
})
export class VoucherPickerDialogComponent implements OnInit {

  assetsDonmain = CONST.assets_domain;
  keyword: '';
  defaultListVoucher: Array<Voucher>;

  constructor(@Inject(MAT_DIALOG_DATA) public listVoucher: Array<Voucher>) { }

  ngOnInit() {
    this.defaultListVoucher = this.listVoucher;
  }

  search() {
    this.listVoucher = this.defaultListVoucher;
    if (this.keyword == "") {
      this.listVoucher = this.defaultListVoucher;
    } else {
      this.listVoucher = this.listVoucher.filter(res => {
        return res.code.toLocaleLowerCase().match(this.keyword.toLocaleLowerCase())
      })
    }
  }
}
