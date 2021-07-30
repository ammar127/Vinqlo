import { Component, OnInit } from '@angular/core';

import { UserService } from './../../core/services/user.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  active = 1;

  feedpath = '/posts/get/feed';
  academicesPath = '/communities/get/academics';
  constructor(private userService: UserService) {}
  ngOnInit(): void {}
  get user() {
    return this.userService.getCurrentUser();
  }
}
