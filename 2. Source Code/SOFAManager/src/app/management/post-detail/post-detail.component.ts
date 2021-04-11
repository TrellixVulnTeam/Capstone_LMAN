import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/service/api-service.service';
import * as CONST from '../../../config/config'
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PostDetail } from 'src/model/postDetail';
import { MatDialogConfirmComponent } from '../mat-dialog-confirm/mat-dialog-confirm.component';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  postId: number;
  postDetail: PostDetail = new PostDetail();
  postImg: string;
  totalRecord: number;
  page: 1;


  constructor(private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.postId = +this.route.snapshot.paramMap.get('id');

    this.apiService.get('post/AdminGetPostDetail?postID=' + this.postId).subscribe(response => {
      if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
        this.postDetail = <any>response;
        this.postImg = CONST.assets_domain + this.postDetail.listImage[0].url;
        this.totalRecord = this.postDetail.listComment.length;
      }
      else {
      }
    }, error => {
      console.log((<any>error).code);
    })
  }

  onClickDelete(){
    const dialogRef = this.dialog.open(MatDialogConfirmComponent, { data: { title: "Xóa bài viết", content: "Bạn muốn xóa bài viết này?" } });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        let formData = new FormData();
        formData.append('postId', this.postId.toString());
        let url = 'post/AdminDeletePost';
        this.apiService.post(url, formData).subscribe(response => {
          if ((<any>response).code == CONST.REQUEST_CODE_SUCCESSFULLY) {
            this.notificationSuccess("Xóa post thành công");
            this.router.navigate(['/posts']);
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
