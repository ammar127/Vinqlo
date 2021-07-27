import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import {NgOtpInputModule} from 'ng-otp-input'
import { OtpComponent } from './OTP/otp.component';
import { NoAuthGuard } from './no-auth-guard.service';

@NgModule({
  declarations: [AuthComponent,OtpComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    NgOtpInputModule
  ], providers: [NoAuthGuard]
})
export class AuthModule { }
