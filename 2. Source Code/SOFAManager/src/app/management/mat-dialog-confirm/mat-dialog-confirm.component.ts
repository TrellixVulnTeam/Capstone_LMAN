import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-mat-dialog-confirm',
  templateUrl: './mat-dialog-confirm.component.html',
  styleUrls: ['./mat-dialog-confirm.component.scss']
})
export class MatDialogConfirmComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
