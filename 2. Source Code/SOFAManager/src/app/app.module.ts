import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from "./account/login/login.component";
import {LogoutComponent} from "./account/logout/logout.component";
import {NotFoundComponent} from "./account/not-found/not-found.component";
import {ProfileComponent} from "./account/profile/profile.component";
import {RegisterComponent} from "./account/register/register.component";
import {ToastrModule} from "ngx-toastr";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import { DefaultLayoutComponent } from './home/default-layout/default-layout.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import {BarChartComponent} from "./home/dashboard/bar-chart/bar-chart.component";
import {DatePickerComponent} from "./home/dashboard/date-picker/date-picker.component";
import {DonutChartComponent} from "./home/dashboard/donut-chart/donut-chart.component";
import {LineChartComponent} from "./home/dashboard/line-chart/line-chart.component";
import {PieChartComponent} from "./home/dashboard/pie-chart/pie-chart.component";
import {ChartsModule} from "ng2-charts";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import { TablesComponent } from './management/tables/tables.component';
import { FormsComponent } from './management/forms/forms.component';
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {ModalModule} from "ngx-bootstrap";
import { UserComponent } from './management/user/user.component';
import { PostComponent } from './management/post/post.component';
import { ReportComponent } from './management/report/report.component';
import { VoucherComponent } from './management/voucher/voucher.component';
import { UserBalanceComponent } from './management/user-balance/user-balance.component';
import { RecommendationDataComponent } from './management/recommendation-data/recommendation-data.component';
import { NewStaffComponent } from './management/new-staff/new-staff.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserDetailComponent } from './management/user-detail/user-detail.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatDialogConfirmComponent } from './management/mat-dialog-confirm/mat-dialog-confirm.component';
import {MatButtonModule} from '@angular/material/button';
import { PostDetailComponent } from './management/post-detail/post-detail.component';
import { FeedbackComponent } from './management/feedback/feedback.component';
import { SupportComponent } from './management/support/support.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    NotFoundComponent,
    ProfileComponent,
    RegisterComponent,
    DefaultLayoutComponent,
    DashboardComponent,
    BarChartComponent,
    DatePickerComponent,
    DonutChartComponent,
    LineChartComponent,
    PieChartComponent,
    TablesComponent,
    FormsComponent,
    UserComponent,
    PostComponent,
    ReportComponent,
    VoucherComponent,
    UserBalanceComponent,
    RecommendationDataComponent,
    NewStaffComponent,
    UserDetailComponent,
    MatDialogConfirmComponent,
    PostDetailComponent,
    FeedbackComponent,
    SupportComponent
  ],
  entryComponents: [MatDialogConfirmComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({timeOut: 2000, progressBar: false, positionClass: 'toast-top-center'}),
    ModalModule.forRoot(),
    FormsModule,
    ChartsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    NgxPaginationModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
