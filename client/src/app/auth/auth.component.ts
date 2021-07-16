import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {

  isLogin:boolean=true;
  isSubmit = false;
  authForm: FormGroup;
  constructor(private router: Router,private fb: FormBuilder,private service:AuthService)
  {
    this.authForm = this.fb.group({'email': ['', Validators.email],'password': ['', Validators.required]});
  }
  ngOnInit(): void {
  }
  submitForm()
  {
    console.log(this.authForm.value);
    this.service.post(this.authForm.value,this.isLogin ? '/login':'/signup').subscribe
    ()
  }
  addFormControl()
  {
    console.log(this.isLogin)
    this.isLogin=!this.isLogin;
    if (!this.isLogin) 
    {
      this.authForm.addControl('firstName', new FormControl());
      this.authForm.addControl('lastName', new FormControl());
      this.authForm.addControl('degree', new FormControl());
      this.authForm.addControl('campus', new FormControl());
    }
  }

}
