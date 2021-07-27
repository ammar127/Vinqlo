import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxOtpInputModule } from "ngx-otp-input";
import { OtpComponent } from './OTP/otp.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';

@NgModule({
  declarations: [AuthComponent,OtpComponent, ForgotComponent, ResetComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    NgxOtpInputModule
  ], providers: [NoAuthGuard]
})
export class AuthModule { }
