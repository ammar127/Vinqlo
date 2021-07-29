import { UserService } from './../../core/services/user.service';
import { User } from './../../core/models/User';
import { ProfileService } from './../../core/services/profile.service';
import { Campus } from './../../core/models/campus';
import { CommonService } from './../../core/services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast } from 'src/app/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editForm!:FormGroup;
  obj!:Object;
  constructor(private modalService: NgbModal,
    private fb: FormBuilder,
    private commonService:CommonService,
    private profileService:ProfileService,
    private userService:UserService
    ) {
      this.create();
    }
  @ViewChild('content') content! : TemplateRef<any>;
  ngOnInit(): void {
  }
  open()
  {
    this.modalService.open(this.content);

  }
  get user(){return this.userService.getCurrentUser()}
  create()
  {
    this.editForm = this.fb.group({
      firstName:[this.user.firstName,Validators.required],
      lastName:[this.user.lastName,Validators.required],
      bio: [this.user.bio, Validators.required],
      phone: ['', Validators.required],
      degree: [this.user.degree.slug, Validators.required],
      campus:[this.user.campus.slug,Validators.required],
      image: [this.user.image]
    });
  }
  nullDegree()
  {
    this.f.degree.reset();
  }
  close() {
    this.modalService.dismissAll();
  }
  onPost()
  {
    this.profileService.editUser(this.editForm.value).subscribe(res=> {
      if(res.status === 200) {
        Toast.fire({icon:'success', title:'Profile updated successfully'})
        this.userService.populate();
      }
    });
  }
  get f() {return this.editForm.controls}
  get campuses()  {return this.commonService.campuses()}
  get degrees() {return this.f.campus.value ? this.campuses[this.campuses.findIndex((e: Campus) => e.slug === this.f.campus.value)].degrees : [] }
}