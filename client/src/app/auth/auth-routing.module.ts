import { AuthGuard } from './../core/services/auth-guard.service';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpComponent } from './OTP/otp.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { ResetComponent } from './reset/reset.component';
import { ForgotComponent } from './forgot/forgot.component';

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
    path: 'otp/:email', component: OtpComponent
  },
  {
    path: 'forgot', component: ForgotComponent
  },
  {
    path: 'reset', component: ResetComponent
  },
  {
    path: '' , redirectTo: '/auth/login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
