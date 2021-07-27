import { ProfileService } from './../../core/services/profile.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  active = 1;
  user!:User;
  constructor(private profileService:ProfileService) {}

  ngOnInit(): void {
    this.profileService.getUser('/users/admin@gmail.com').subscribe
    (
      res=>{
       this.user=res.data.user;
      }
    )
  }
}
