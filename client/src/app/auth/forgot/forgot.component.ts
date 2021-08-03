import { UserType } from './../../core/constants/UserType';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  isLogin: boolean = true;
  errors: any= null;
  authForm!: FormGroup;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private commonService:CommonModule) { }

  ngOnInit(): void {
  }
  get f() {return this.authForm.controls}

  submitForm() {
    this.errors = null;

    const credentials = this.authForm.value;
    this.userService.attemptAuth(this.isLogin, credentials).subscribe
    (
      (res: any) =>
      {
        let route = '';
        if(res.status === 200) {
          if(res.data.user && !res.data.user.verified ) {
            route = '/auth/otp/'+res.data.user.email+'/1';
          } else if(res.data.user && res.data.user.role === UserType.user){
            route = '/feed';
          } else if(res.data.user && res.data.user.role === UserType.admin || res.data.user.role === UserType.superAdmin  ){
            route = '/users';
          }
        }
        this.router.navigate([route])
      },
      err =>
      {
        if(err && err == 'Unauthorized') {
          this.errors = ['Invalid Email or Password'];
        } else if(err && err.code === 401.1 ) {
          this.router.navigate(['/auth/otp', this.f.email.value, 1])
        } else if(err && err.code === 401.2) {
          this.errors = [err.message];
        }  else if(err && err.code === 400.1) {
          this.errors = ['Email already exist'];
        } else if(err && err.code === 422) {
          this.errors = err.moreInfo.errors.map((e: any) => e.msg);
        }
      }
    );
  }



}
