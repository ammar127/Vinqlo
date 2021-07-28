import { ProfileService } from './../../core/services/profile.service';
import { Component, OnInit } from '@angular/core';
import { User, UserService } from 'src/app/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  active = 1;
  communityUrl = '/communities/get/followed';
  myCommunityUrl = '/communities/get/my';
  savedPostUrl = '/posts/get/saved';
  myPostUrl = '/posts/get/my';
  constructor(private userService:UserService) {}

  ngOnInit(): void {
  }
  get user() {
    return this.userService.getCurrentUser();
  }
}
