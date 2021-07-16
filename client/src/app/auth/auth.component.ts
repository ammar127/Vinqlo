import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {

  isLogin:boolean=true;
  isSubmitting = false;
  authForm: FormGroup;
  constructor(private router: Router,private fb: FormBuilder)
  {
    this.authForm = this.fb.group({'email': ['', Validators.required],'password': ['', Validators.required]});
  }
  ngOnInit(): void {
  }
  submitForm()
  {
    console.log(this.authForm.value);
    
  }
  addFormControl()
  {
    console.log(this.isLogin)
    this.isLogin=!this.isLogin;
    if (!this.isLogin) 
    {
      this.authForm.addControl('fname', new FormControl());
      this.authForm.addControl('lname', new FormControl());
      this.authForm.addControl('degree', new FormControl());
      this.authForm.addControl('campus', new FormControl());
    }
  }

}
