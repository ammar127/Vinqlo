import { campuses } from './../core/constants/campuses';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Campus, CommonService, Errors, UserService } from '../core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLogin: boolean = true;
  title: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;
  campus:any;
  selectedCampus!:any[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private commonService:CommonService
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    }, {updateOn: 'blur'} );
  }

  ngOnInit()
  {
    this.route.url.subscribe(data => {
      let authType = data[data.length - 1].path;
      this.isLogin = authType === 'login'
      this.onChangeType();
    });
    
  }
  onChangeType() {
    if (!this.isLogin) 
    {
      this.authForm.addControl('firstName', new FormControl());
      this.authForm.addControl('lastName', new FormControl());
      this.authForm.addControl('degree', new FormControl());
      this.authForm.addControl('campus', new FormControl());
      this.authForm.addControl('confirmPassword', new FormControl());
      this.campus=this.commonService.campuses();
      this.f.degree.disable();
    }else {
      this.authForm.removeControl('firstName');
      this.authForm.removeControl('lastName');
      this.authForm.removeControl('degree');
      this.authForm.removeControl('campus');
      this.authForm.removeControl('confirmPassword');
    }
  }
  onCampusChange() {
    this.f.degree.enable();
  }
  get f() {return this.authForm.controls}
  get degrees() {return this.f.campus.value ? this.campus.find((e: Campus) => e.slug === this.f.campus.value).degrees : [] }
  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};

    const credentials = this.authForm.value;
    this.userService.attemptAuth(this.isLogin, credentials).subscribe
    (
      (res: any) =>
      {
        let route = '';
        if(res.status === 200) {
          route = this.isLogin ? '/feed': '/auth/otp';
        }
        this.router.navigate([route])
      },
      err => 
      {
        console.log('nai chala', err)
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}
