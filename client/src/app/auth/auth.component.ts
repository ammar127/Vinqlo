import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
<<<<<<< HEAD
import { Router } from '@angular/router';
import { ApiService } from '../core/services/api.service';
import { AuthService } from '../core/services/auth.service';
=======
import { ActivatedRoute, Router } from '@angular/router';
import { Errors, UserService } from '../core';
>>>>>>> master

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
<<<<<<< HEAD
  onInputChange!:number;
  constructor(private api:ApiService, private router: Router,private fb: FormBuilder,private service:AuthService)
  {
    this.authForm = this.fb.group({'email': ['', Validators.email],'password': ['', Validators.required]});
  }
  ngOnInit(): void {
  }
  submitForm()
  {
    console.log(this.authForm.value);
    this.service.post(this.isLogin ? '/login':'/signup',this.authForm.value).subscribe
    (
      res=>
      {
        console.log(res)
      }
    )
=======

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
>>>>>>> master
  }

  ngOnInit() {}

  onChangeType() {
    this.isLogin=!this.isLogin;
    if (!this.isLogin) 
    {
      this.authForm.addControl('firstName', new FormControl());
      this.authForm.addControl('lastName', new FormControl());
      this.authForm.addControl('degree', new FormControl());
      this.authForm.addControl('campus', new FormControl());
    }else {
      this.authForm.removeControl('firstName');
      this.authForm.removeControl('lastName');
      this.authForm.removeControl('degree');
      this.authForm.removeControl('campus');
    }
  }
<<<<<<< HEAD
  
=======
  get f() {return this.authForm.controls}

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};

    const credentials = this.authForm.value;
    this.userService
    .attemptAuth(this.isLogin, credentials)
    .subscribe(
      data => this.router.navigateByUrl('/'),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
>>>>>>> master
}
