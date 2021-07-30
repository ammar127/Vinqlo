import { Component, OnInit } from '@angular/core';
import { UserService } from './../../core/services/user.service';
@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
})
export class CommunityComponent implements OnInit {
  active = 1;

  feedpath = '/posts/get/feed';
  academicesPath = '/communities/get/academics';
  constructor(private userService: UserService) {}
  ngOnInit(): void {}
  get user() {
    return this.userService.getCurrentUser();
  }
}
