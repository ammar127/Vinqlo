import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import {NgOtpInputModule} from 'ng-otp-input'
import { OtpComponent } from './OTP/otp.component';

@NgModule({
  declarations: [AuthComponent,OtpComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    NgOtpInputModule
  ]
})
export class AuthModule { }
