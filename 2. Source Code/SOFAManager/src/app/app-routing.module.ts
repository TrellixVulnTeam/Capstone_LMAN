import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from "./account/profile/profile.component";
import { LoginComponent } from "./account/login/login.component";
import { RegisterComponent } from "./account/register/register.component";
import { LogoutComponent } from "./account/logout/logout.component";
import { NotFoundComponent } from "./account/not-found/not-found.component";
import { DashboardComponent } from "./home/dashboard/dashboard.component";
import { TablesComponent } from "./management/tables/tables.component";
import { DefaultLayoutComponent } from "./home/default-layout/default-layout.component";
import { FormsComponent } from "./management/forms/forms.component";
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService } from 'src/service/auth-guard.service';
import { UserComponent } from './management/user/user.component';
import { PostComponent } from './management/post/post.component';
import { ReportComponent } from './management/report/report.component';
import { VoucherComponent } from './management/voucher/voucher.component';
import { UserBalanceComponent } from './management/user-balance/user-balance.component';
import { RecommendationDataComponent } from './management/recommendation-data/recommendation-data.component';
import { UserDetailComponent } from './management/user-detail/user-detail.component';

export function tokenGetter() {
  return localStorage.getItem('jwt')
}


const routes: Routes = [
  {
    path: '', component: DefaultLayoutComponent, canActivate: [AuthGuardService], children: [
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
      { path: 'register', component: RegisterComponent, data: { title: 'Đăng kí' } },
      { path: 'logout', component: LogoutComponent, data: { title: 'Đăng xuất' } },
      { path: 'tables', component: TablesComponent, data: { title: 'Tables' }, canActivate: [AuthGuardService] },
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' }, canActivate: [AuthGuardService] },
      { path: 'forms', component: FormsComponent, data: { title: 'Forms' }, canActivate: [AuthGuardService] },
      { path: 'users', component: UserComponent, data: { title: 'User management' }, canActivate: [AuthGuardService] },
      { path: 'posts', component: PostComponent, data: { title: 'Post management' }, canActivate: [AuthGuardService] },
      { path: 'reports', component: ReportComponent, data: { title: 'Report management' }, canActivate: [AuthGuardService] },
      { path: 'vouchers', component: VoucherComponent, data: { title: 'Voucher management' }, canActivate: [AuthGuardService] },
      { path: 'balances', component: UserBalanceComponent, data: { title: 'Balance management' }, canActivate: [AuthGuardService] },
      { path: 'recommendation', component: RecommendationDataComponent, data: { title: 'Recommentdation management' }, canActivate: [AuthGuardService] },
      { path: 'user-detail/:id', component: UserDetailComponent, data: { title: 'Recommentdation management' }, canActivate: [AuthGuardService] }
    ]
  },
  { path: 'login', component: LoginComponent, data: { title: 'Đăng nhập' } },
  { path: 'not-found', component: NotFoundComponent, data: { title: 'Không tìm thấy' } },
  // otherwise redirect to profile
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:4200"],
        disallowedRoutes: []
      }
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
