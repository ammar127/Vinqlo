import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpComponent } from './OTP/otp.component';
import { NoAuthGuard } from './no-auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    // canActivate: [NoAuthGuard]
  },
  {
    path: 'register',
    component: AuthComponent,
    // canActivate: [NoAuthGuard]
  },
  {
    path: 'otp', component: OtpComponent
  },
  {
    path: '/auth' , redirectTo: '/auth/login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
