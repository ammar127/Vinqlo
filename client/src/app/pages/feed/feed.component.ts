import { PostService } from './../../core/services/post.service';
import { UserService } from './../../core/services/user.service';
import { Community } from './../../core/models/community';
import { CommunityService } from './../../core/services/community.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/core/models';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  active = 1;
  searchQuery:string='';
  feedpath = '/posts/get/feed';
  academicesPath = '/communities/get/academics';
  sortType: number=0;
  sortTypes = [ { id: 0, name: 'Most Recent' }, { id: 1, name: 'Trending' }, ];
  constructor(private userService: UserService,private postService:PostService)
  {

  }
  ngOnInit(): void {
  }
  get user() {return this.userService.getCurrentUser()  }
}
