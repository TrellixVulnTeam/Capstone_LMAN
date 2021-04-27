import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { VoucherAdd } from 'src/model/VoucherAdd';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-add-voucher-dialog',
  templateUrl: './add-voucher-dialog.component.html',
  styleUrls: ['./add-voucher-dialog.component.scss']
})
export class AddVoucherDialogComponent implements OnInit {

  voucher: VoucherAdd = new VoucherAdd();
  today: Date = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
  }

  onInputDate(event){
    this.voucher.toDate = event.value;
  }
  onSelectImage(event){
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event: any) => {
        this.voucher.image = event.target.result;
      }
    }
  }

  ngOnInit() {
  }

}
