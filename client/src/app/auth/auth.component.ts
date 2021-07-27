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
    this.onChangeType();
    this.route.url.subscribe(data => {
      let authType = data[data.length - 1].path;
      this.isLogin = authType === 'login'
      this.onChangeType();
    });
    
  }
  onChangeType() {
    if (!this.isLogin) 
    {
      this.authForm.addControl('firstName', new FormControl('', [Validators.required]));
      this.authForm.addControl('lastName', new FormControl('', [Validators.required]));
      this.authForm.addControl('degree', new FormControl('', [Validators.required]));
      this.authForm.addControl('campus', new FormControl(null, [Validators.required]));
      this.authForm.addControl('confirmPassword', new FormControl('', [Validators.required]));

      this.f.degree.disable();
    }else {
      this.authForm.removeControl('firstName');
      this.authForm.removeControl('lastName');
      this.authForm.removeControl('degree');
      this.authForm.removeControl('campus');
      this.authForm.removeControl('confirmPassword');
    }
  }
  get campuses()  {return this.commonService.campuses()}
  onCampusChange() {
    this.f.degree.enable();
  }
  get f() {return this.authForm.controls}
  get degrees() {return this.f.campus.value ? this.campuses[this.campuses.findIndex((e: Campus) => e.slug === this.f.campus.value)].degrees : [] }
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
          if(res.data.user && !res.data.user.verified ) {
            route = '/auth/otp';
          } else {
            route = this.isLogin ? '/feed': '/auth/otp';
          }
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
